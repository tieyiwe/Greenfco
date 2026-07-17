import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { getAll, getOneWhere, insert, update } from '../db/store.js';

const router = Router();
const JWT_SECRET     = process.env.JWT_SECRET     || 'greenfco_secret_key_2024';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD  || 'greenfco_admin_2024';

if (!process.env.ADMIN_PASSWORD) {
  console.warn('⚠️  ADMIN_PASSWORD not set — using insecure default.');
}

// ── Seed admin users on first start ───────────────────────────
let seeded = false;
async function seedAdminUsers() {
  if (seeded) return;
  seeded = true;

  const superEmail  = 'tieyiwebass@gmail.com';
  const secondEmail = 'dipamawenmanelie@gmail.com';
  const TEMP_PASS   = 'GreenFCO@Admin24';

  const existing = getAll('admin_users');

  if (!existing.find(u => u.email === superEmail)) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    insert('admin_users', {
      email: superEmail,
      name: 'Super Admin',
      role: 'super_admin',
      password_hash: hash,
      must_change_password: false,
      active: true,
    });
    console.log('[Admin] Created super admin:', superEmail);
  }

  if (!existing.find(u => u.email === secondEmail)) {
    const hash = await bcrypt.hash(TEMP_PASS, 10);
    insert('admin_users', {
      email: secondEmail,
      name: 'Wenmanelie Dipama',
      role: 'manager',
      password_hash: hash,
      must_change_password: true,
      active: true,
    });
    console.log('[Admin] Created admin account:', secondEmail, '(temp password)');
  }
}

// Run seed immediately (async, non-blocking)
seedAdminUsers().catch(err => console.error('[Admin] Seed error:', err.message));

// ── Rate limiter ──────────────────────────────────────────────
const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── POST /admin/auth — login ──────────────────────────────────
router.post('/auth', adminAuthLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!password) return res.status(400).json({ error: 'Mot de passe requis.' });

  // Ensure seed has run
  await seedAdminUsers();

  let adminUser = email ? getOneWhere('admin_users', 'email', email.toLowerCase().trim()) : null;

  // Fallback: no email provided — match by global password (super admin)
  if (!adminUser && !email) {
    adminUser = getOneWhere('admin_users', 'email', 'tieyiwebass@gmail.com');
  }

  if (!adminUser || !adminUser.active) {
    return res.status(401).json({ error: 'Identifiants incorrects.' });
  }

  const valid = await bcrypt.compare(password, adminUser.password_hash);
  if (!valid) return res.status(401).json({ error: 'Identifiants incorrects.' });

  const token = jwt.sign(
    { role: adminUser.role === 'super_admin' ? 'admin' : adminUser.role, email: adminUser.email, adminId: adminUser.id },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    token,
    must_change_password: !!adminUser.must_change_password,
    user: {
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    },
  });
});

// ── POST /admin/auth/change-password ─────────────────────────
router.post('/auth/change-password', adminAuthLimiter, async (req, res) => {
  const { email, current_password, new_password } = req.body;
  if (!email || !current_password || !new_password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }
  if (new_password.length < 8) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' });
  }

  const adminUser = getOneWhere('admin_users', 'email', email.toLowerCase().trim());
  if (!adminUser) return res.status(401).json({ error: 'Compte introuvable.' });

  const valid = await bcrypt.compare(current_password, adminUser.password_hash);
  if (!valid) return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });

  const newHash = await bcrypt.hash(new_password, 10);
  update('admin_users', adminUser.id, { password_hash: newHash, must_change_password: false });

  const token = jwt.sign(
    { role: adminUser.role === 'super_admin' ? 'admin' : adminUser.role, email: adminUser.email, adminId: adminUser.id },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ success: true, token, user: { name: adminUser.name, email: adminUser.email, role: adminUser.role } });
});

export default router;
