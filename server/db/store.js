// Simple in-memory store (replace with PostgreSQL in production)
const store = {
  users: [],
  crops: [],
  finance: [],
  market: [],
  newsletter: [],
  contact: [],
  consulting: [],
};

let ids = { users: 1, crops: 1, finance: 1, market: 1, newsletter: 1, contact: 1, consulting: 1 };

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
  const item = { id: ids[table]++, ...data, created_at: new Date().toISOString() };
  store[table] = store[table] || [];
  store[table].push(item);
  return item;
}

export function update(table, id, data) {
  const idx = store[table]?.findIndex(item => item.id === id);
  if (idx === -1) return null;
  store[table][idx] = { ...store[table][idx], ...data, updated_at: new Date().toISOString() };
  return store[table][idx];
}

export function remove(table, id) {
  const len = store[table]?.length || 0;
  store[table] = store[table]?.filter(item => item.id !== id) || [];
  return store[table].length < len;
}
