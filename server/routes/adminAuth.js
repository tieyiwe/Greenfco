import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { getAll, getOneWhere, insert, update, remove } from '../db/store.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'greenfco_secret_key_2024';

const SUPER_TEMP_PASS  = 'GreenFCO@Super24';
const SECOND_TEMP_PASS = 'GreenFCO@Admin24';

// ── Seed admin users on first start ───────────────────────────
// Set ADMIN_SUPER_PASSWORD / ADMIN_SECOND_PASSWORD in Replit Secrets so
// passwords survive across deployments even when db.json is wiped.
let seeded = false;
async function seedAdminUsers() {
  if (seeded) return;
  seeded = true;

  const superEmail  = process.env.ADMIN_SUPER_EMAIL  || 'tieyiwebass@gmail.com';
  const secondEmail = process.env.ADMIN_SECOND_EMAIL || 'wenmaneg20@gmail.com';

  // Prefer env var passwords — they survive deploys; fall back to temp passwords
  const superPassword  = process.env.ADMIN_SUPER_PASSWORD  || SUPER_TEMP_PASS;
  const secondPassword = process.env.ADMIN_SECOND_PASSWORD || SECOND_TEMP_PASS;

  const superFromEnv  = !!process.env.ADMIN_SUPER_PASSWORD;
  const secondFromEnv = !!process.env.ADMIN_SECOND_PASSWORD;

  const existing  = getAll('admin_users');
  const superAdmin = existing.find(u => u.email === superEmail);

  if (!superAdmin) {
    const hash = await bcrypt.hash(superPassword, 10);
    insert('admin_users', {
      email: superEmail,
      name: 'Super Admin',
      role: 'super_admin',
      password_hash: hash,
      must_change_password: !superFromEnv,
      active: true,
    });
    console.log(`[Admin] Created super admin: ${superEmail}${superFromEnv ? ' (password from env)' : ` — temp: ${superPassword}`}`);
  } else if (superFromEnv) {
    // Env var is set — sync stored password to env var so it survives deploys.
    // Only rehash if it doesn't already match (avoids bcrypt overhead on every boot).
    const match = await bcrypt.compare(superPassword, superAdmin.password_hash);
    if (!match) {
      const hash = await bcrypt.hash(superPassword, 10);
      update('admin_users', superAdmin.id, {
        password_hash: hash,
        must_change_password: false,
        password_changed_at: new Date().toISOString(),
      });
      console.log(`[Admin] Synced super admin password from ADMIN_SUPER_PASSWORD env var`);
    }
  }
  // NOTE: No migration branch — we never reset a password that was already set.

  // Remove old email if it exists (migration from previous email)
  const oldEntry = existing.find(u => u.email === 'dipamawenmanelie@gmail.com');
  if (oldEntry) remove('admin_users', oldEntry.id);

  const secondAdmin = existing.find(u => u.email === secondEmail);
  if (!secondAdmin) {
    const hash = await bcrypt.hash(secondPassword, 10);
    insert('admin_users', {
      email: secondEmail,
      name: 'Wenmane',
      role: 'manager',
      password_hash: hash,
      must_change_password: !secondFromEnv,
      active: true,
    });
    console.log(`[Admin] Created admin account: ${secondEmail}${secondFromEnv ? ' (password from env)' : ` — temp: ${secondPassword}`}`);
  } else if (secondFromEnv) {
    const match = await bcrypt.compare(secondPassword, secondAdmin.password_hash);
    if (!match) {
      const hash = await bcrypt.hash(secondPassword, 10);
      update('admin_users', secondAdmin.id, {
        password_hash: hash,
        must_change_password: false,
        password_changed_at: new Date().toISOString(),
      });
      console.log(`[Admin] Synced second admin password from ADMIN_SECOND_PASSWORD env var`);
    }
  }
}

// Run seed immediately (async, non-blocking)
seedAdminUsers().catch(err => console.error('[Admin] Seed error:', err.message));

// ── Rate limiter ──────────────────────────────────────────────
const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── POST /admin/auth — login ──────────────────────────────────
router.post('/auth', adminAuthLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    await seedAdminUsers();

    const adminUser = getOneWhere('admin_users', 'email', email.toLowerCase().trim());

    if (!adminUser || !adminUser.active) {
      return res.status(401).json({ error: 'Identifiants incorrects.' });
    }

    const valid = await bcrypt.compare(password, adminUser.password_hash);
    if (!valid) return res.status(401).json({ error: 'Identifiants incorrects.' });

    const token = jwt.sign(
      { role: 'admin', adminRole: adminUser.role, email: adminUser.email, adminId: adminUser.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    insert('activity', {
      type: 'system',
      actor: adminUser.name || adminUser.email,
      action: "s'est connecté au panneau admin",
      target: adminUser.email,
      severity: 'info',
    });

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
  } catch {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// ── POST /admin/auth/change-password ─────────────────────────
router.post('/auth/change-password', adminAuthLimiter, async (req, res) => {
  try {
    const { email, current_password, new_password } = req.body;
    if (!email || !current_password || !new_password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }
    if (new_password.length < 8) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' });
    }
    if (new_password === current_password) {
      return res.status(400).json({ error: "Le nouveau mot de passe doit être différent de l'actuel." });
    }

    const adminUser = getOneWhere('admin_users', 'email', email.toLowerCase().trim());
    if (!adminUser) return res.status(401).json({ error: 'Compte introuvable.' });

    const valid = await bcrypt.compare(current_password, adminUser.password_hash);
    if (!valid) return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });

    const newHash = await bcrypt.hash(new_password, 10);
    update('admin_users', adminUser.id, {
      password_hash: newHash,
      must_change_password: false,
      password_changed_at: new Date().toISOString(),
    });

    // Sync user account so admin can log into the user dashboard with the same password
    const existingUser = getOneWhere('users', 'email', adminUser.email);
    if (existingUser) {
      update('users', existingUser.id, { password_hash: newHash });
    } else {
      insert('users', {
        name: adminUser.name,
        email: adminUser.email,
        password_hash: newHash,
        user_type: 'expert',
        language: 'fr',
        country: '',
        status: 'active',
        is_admin: true,
      });
    }

    const token = jwt.sign(
      { role: 'admin', adminRole: adminUser.role, email: adminUser.email, adminId: adminUser.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, user: { name: adminUser.name, email: adminUser.email, role: adminUser.role } });
  } catch {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

export default router;
