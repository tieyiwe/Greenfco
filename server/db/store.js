import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');
const PG_KEY    = 'greenfco_v1';

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

// ── PostgreSQL helpers ────────────────────────────────────────
let pool = null;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

async function pgLoad() {
  const p = getPool();
  if (!p) return null;
  try {
    await p.query(`
      CREATE TABLE IF NOT EXISTS app_store (
        key   VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);
    const { rows } = await p.query('SELECT value FROM app_store WHERE key = $1', [PG_KEY]);
    return rows[0]?.value || null;
  } catch (err) {
    console.error('[DB] PostgreSQL load error:', err.message);
    return null;
  }
}

async function pgSave(json) {
  const p = getPool();
  if (!p) return;
  try {
    await p.query(
      `INSERT INTO app_store (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2`,
      [PG_KEY, json]
    );
  } catch (err) {
    console.error('[DB] PostgreSQL save error:', err.message);
  }
}

// ── initPersistence: call once before app.listen() ────────────
export async function initPersistence() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  // 1. Try PostgreSQL (survives deployments)
  if (process.env.DATABASE_URL) {
    const raw = await pgLoad();
    if (raw) {
      try {
        hydrateFrom(JSON.parse(raw));
        console.log(`[DB] Loaded from PostgreSQL — ${Object.values(store).flat().length} records`);
        return;
      } catch (err) {
        console.warn('[DB] PostgreSQL parse failed, falling back to file:', err.message);
      }
    } else {
      console.log('[DB] PostgreSQL: no saved data yet — will initialise fresh');
    }
  }

  // 2. Fall back to local db.json (dev or first boot)
  if (fs.existsSync(DATA_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      hydrateFrom(saved);
      console.log(`[DB] Loaded ${DATA_FILE} — ${Object.values(store).flat().length} records`);
      scheduleDbSave(); // mirror to PostgreSQL for next deploy
    } catch (err) {
      console.warn('[DB] Failed to parse db.json, starting fresh:', err.message);
    }
  } else {
    console.log('[DB] No existing data — starting fresh');
  }
}

// ── Save scheduler ────────────────────────────────────────────
let saveTimer = null;
let pgSaveTimer = null;

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
  scheduleDbSave();
}

function scheduleDbSave() {
  if (!process.env.DATABASE_URL) return;
  if (pgSaveTimer) clearTimeout(pgSaveTimer);
  pgSaveTimer = setTimeout(() => {
    pgSaveTimer = null;
    pgSave(JSON.stringify({ store, ids })).catch(() => {});
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
