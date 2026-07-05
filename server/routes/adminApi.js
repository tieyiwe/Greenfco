import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getAll, getById, insert, update, remove } from '../db/store.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'greenfco_secret_key_2024';

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    if (payload.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    req.adminUser = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
}

router.use(requireAdmin);

// ── Stats ─────────────────────────────────────────────────
router.get('/stats', (req, res) => {
  const users = getAll('users');
  const listings = getAll('market');
  const consulting = getAll('consulting');
  const newsletter = getAll('newsletter');
  const contacts = getAll('contact');
  const gallery = getAll('gallery');
  const crops = getAll('crops');
  const finance = getAll('finance');
  const collaborators = getAll('collaborators');

  res.json({
    users: users.length,
    listings: listings.length,
    active_listings: listings.filter(l => l.active !== false).length,
    crops: crops.length,
    finance: finance.length,
    consulting: consulting.length,
    pending_consulting: consulting.filter(c => !c.status || c.status === 'pending').length,
    newsletter: newsletter.length,
    contacts: contacts.length,
    unread_contacts: contacts.filter(c => !c.read).length,
    gallery: gallery.length,
    collaborators: collaborators.length,
  });
});

// ── Users ─────────────────────────────────────────────────
router.get('/users', (req, res) => {
  const users = getAll('users').map(({ password_hash, ...u }) => u);
  res.json(users.reverse());
});

router.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const existing = getById('users', id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  const { password_hash, ...safe } = update('users', id, req.body);
  res.json(safe);
});

router.delete('/users/:id', (req, res) => {
  remove('users', parseInt(req.params.id));
  res.json({ success: true });
});

// ── Listings ──────────────────────────────────────────────
router.get('/listings', (req, res) => {
  res.json(getAll('market').reverse());
});

router.put('/listings/:id', (req, res) => {
  const updated = update('market', parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/listings/:id', (req, res) => {
  remove('market', parseInt(req.params.id));
  res.json({ success: true });
});

// ── Contacts ──────────────────────────────────────────────
router.get('/contacts', (req, res) => {
  res.json(getAll('contact').reverse());
});

router.put('/contacts/:id', (req, res) => {
  const updated = update('contact', parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/contacts/:id', (req, res) => {
  remove('contact', parseInt(req.params.id));
  res.json({ success: true });
});

// ── Consulting ────────────────────────────────────────────
router.get('/consulting', (req, res) => {
  res.json(getAll('consulting').reverse());
});

router.put('/consulting/:id', (req, res) => {
  const updated = update('consulting', parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/consulting/:id', (req, res) => {
  remove('consulting', parseInt(req.params.id));
  res.json({ success: true });
});

// ── Newsletter ────────────────────────────────────────────
router.get('/newsletter', (req, res) => {
  res.json(getAll('newsletter').reverse());
});

router.delete('/newsletter/:id', (req, res) => {
  remove('newsletter', parseInt(req.params.id));
  res.json({ success: true });
});

// ── Gallery ───────────────────────────────────────────────
router.get('/gallery', (req, res) => {
  res.json(getAll('gallery').reverse());
});

router.post('/gallery', (req, res) => {
  const { title, title_fr, category, image_url, caption, caption_fr } = req.body;
  if (!title || !image_url) return res.status(400).json({ error: 'title and image_url required' });
  const item = insert('gallery', {
    title,
    title_fr: title_fr || title,
    category: category || 'general',
    image_url,
    caption: caption || '',
    caption_fr: caption_fr || caption || '',
  });
  res.status(201).json(item);
});

router.put('/gallery/:id', (req, res) => {
  const updated = update('gallery', parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/gallery/:id', (req, res) => {
  remove('gallery', parseInt(req.params.id));
  res.json({ success: true });
});

// ── Collaborators ─────────────────────────────────────────
router.get('/collaborators', (req, res) => {
  res.json(getAll('collaborators').reverse());
});

router.post('/collaborators', (req, res) => {
  const { name, email, role, customPermissions } = req.body;
  if (!name || !email || !role) return res.status(400).json({ error: 'name, email, role required' });
  const existing = getAll('collaborators').find(c => c.email === email);
  if (existing) return res.status(409).json({ error: 'Collaborator already exists' });
  const collab = insert('collaborators', {
    name, email, role,
    status: 'pending',
    customPermissions: customPermissions || null,
  });
  res.status(201).json(collab);
});

router.put('/collaborators/:id', (req, res) => {
  const updated = update('collaborators', parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/collaborators/:id', (req, res) => {
  remove('collaborators', parseInt(req.params.id));
  res.json({ success: true });
});

// ── Activity log ──────────────────────────────────────────
router.get('/activity', (req, res) => {
  res.json(getAll('activity').reverse().slice(0, 100));
});

router.post('/activity', (req, res) => {
  const { type, actor, action, target, severity } = req.body;
  const entry = insert('activity', { type, actor, action, target, severity: severity || 'info' });
  res.status(201).json(entry);
});

// ── Platform settings ─────────────────────────────────────
router.get('/settings', (req, res) => {
  const settings = getAll('settings')[0];
  res.json(settings || {
    whatsapp: '+226 XX XX XX XX',
    platform_name: 'GreenFCO',
    support_email: 'support@greenfco.com',
    maintenance_mode: false,
    allow_new_registrations: true,
    ai_features_enabled: true,
    marketplace_enabled: true,
    network_enabled: true,
  });
});

router.put('/settings', (req, res) => {
  const existing = getAll('settings')[0];
  const updated = existing
    ? update('settings', existing.id, req.body)
    : insert('settings', req.body);
  res.json(updated);
});

export default router;
