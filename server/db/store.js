import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

const TABLES = ['users', 'crops', 'finance', 'market', 'newsletter', 'contact', 'consulting', 'gallery', 'collaborators', 'activity', 'settings', 'admin_users'];

function initStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const saved = JSON.parse(raw);
      const store = {};
      const ids = {};
      for (const t of TABLES) {
        store[t] = Array.isArray(saved.store?.[t]) ? saved.store[t] : [];
        const maxId = store[t].reduce((m, r) => Math.max(m, r.id || 0), 0);
        ids[t] = (saved.ids?.[t] > maxId ? saved.ids[t] : maxId) + 1;
      }
      console.log(`[DB] Loaded ${DATA_FILE} — ${Object.values(store).flat().length} records`);
      return { store, ids };
    } catch (err) {
      console.warn(`[DB] Failed to parse ${DATA_FILE}, starting fresh:`, err.message);
    }
  }
  const store = Object.fromEntries(TABLES.map(t => [t, []]));
  const ids   = Object.fromEntries(TABLES.map(t => [t, 1]));
  return { store, ids };
}

let { store, ids } = initStore();

let saveTimer = null;
function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify({ store, ids }, null, 2));
    } catch (err) {
      console.error('[DB] Failed to save:', err.message);
    }
  }, 200);
}

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
