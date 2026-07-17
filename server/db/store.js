import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');
const REPLIT_DB_KEY = 'greenfco_store_v1';

const TABLES = ['users', 'crops', 'finance', 'market', 'newsletter', 'contact', 'consulting', 'gallery', 'collaborators', 'activity', 'settings', 'admin_users', 'access_requests', 'projects', 'channels', 'team_messages'];

// ── In-memory store ───────────────────────────────────────────
let store = Object.fromEntries(TABLES.map(t => [t, []]));
let ids   = Object.fromEntries(TABLES.map(t => [t, 1]));

function hydrateFrom(saved) {
  for (const t of TABLES) {
    store[t] = Array.isArray(saved.store?.[t]) ? saved.store[t] : (store[t] || []);
    const maxId = store[t].reduce((m, r) => Math.max(m, r.id || 0), 0);
    ids[t] = Math.max(ids[t] || 1, (saved.ids?.[t] || 1), maxId + 1);
  }
}

// ── Replit Database (no extra package — plain HTTP via axios) ─
async function replitDbGet(key) {
  const url = process.env.REPLIT_DB_URL;
  if (!url) return null;
  try {
    const res = await axios.get(`${url}/${encodeURIComponent(key)}`);
    return typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
  } catch (err) {
    if (err.response?.status === 404) return null;
    console.error('[DB] Replit DB get error:', err.message);
    return null;
  }
}

async function replitDbSet(key, value) {
  const url = process.env.REPLIT_DB_URL;
  if (!url) return;
  try {
    await axios.post(url,
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  } catch (err) {
    console.error('[DB] Replit DB set error:', err.message);
  }
}

// ── initPersistence: call once before app.listen() ────────────
export async function initPersistence() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  // 1. Try Replit Database first (survives deployments)
  if (process.env.REPLIT_DB_URL) {
    const raw = await replitDbGet(REPLIT_DB_KEY);
    if (raw) {
      try {
        hydrateFrom(JSON.parse(raw));
        console.log(`[DB] Loaded from Replit Database — ${Object.values(store).flat().length} records`);
        return;
      } catch (err) {
        console.warn('[DB] Replit DB parse failed, falling back to file:', err.message);
      }
    } else {
      console.log('[DB] Replit Database: no saved data yet, will initialise fresh');
    }
  }

  // 2. Fall back to local db.json (dev / first-time setup)
  if (fs.existsSync(DATA_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      hydrateFrom(saved);
      console.log(`[DB] Loaded ${DATA_FILE} — ${Object.values(store).flat().length} records`);
      scheduleReplitSave(); // mirror to Replit DB for next deploy
    } catch (err) {
      console.warn('[DB] Failed to parse db.json, starting fresh:', err.message);
    }
  } else {
    console.log('[DB] No existing data — starting fresh');
  }
}

// ── Save scheduler ────────────────────────────────────────────
let saveTimer = null;
let replitSaveTimer = null;

function scheduleSave() {
  // Fast local file write (200 ms debounce)
  if (!saveTimer) {
    saveTimer = setTimeout(() => {
      saveTimer = null;
      try {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ store, ids }, null, 2));
      } catch (err) {
        console.error('[DB] Failed to save db.json:', err.message);
      }
    }, 200);
  }
  // Slow Replit DB write (2 s debounce — avoids hammering the API)
  scheduleReplitSave();
}

function scheduleReplitSave() {
  if (!process.env.REPLIT_DB_URL) return;
  if (replitSaveTimer) clearTimeout(replitSaveTimer);
  replitSaveTimer = setTimeout(() => {
    replitSaveTimer = null;
    replitDbSet(REPLIT_DB_KEY, JSON.stringify({ store, ids })).catch(() => {});
  }, 2000);
}

// ── CRUD ──────────────────────────────────────────────────────
export function getAll(table) {
  return store[table] || [];
}

export function getById(table, id) {
  return store[table]?.find(item => item.id === id);
}

export function getWhere(table, field, value) {
  return store[table]?.filter(item => item[field] === value) || [];
}

export function getOneWhere(table, field, value) {
  return store[table]?.find(item => item[field] === value);
}

export function insert(table, data) {
  if (!store[table]) store[table] = [];
  if (!ids[table])   ids[table]   = 1;
  const item = { id: ids[table]++, ...data, created_at: new Date().toISOString() };
  store[table].push(item);
  scheduleSave();
  return item;
}

export function update(table, id, data) {
  const idx = store[table]?.findIndex(item => item.id === id);
  if (idx === undefined || idx === -1) return null;
  store[table][idx] = { ...store[table][idx], ...data, updated_at: new Date().toISOString() };
  scheduleSave();
  return store[table][idx];
}

export function remove(table, id) {
  const before = store[table]?.length || 0;
  store[table] = store[table]?.filter(item => item.id !== id) || [];
  scheduleSave();
  return store[table].length < before;
}
