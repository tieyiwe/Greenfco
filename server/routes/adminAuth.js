import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAll, getOneWhere, insert, update, remove } from '../db/store.js';
import { sendPasswordResetEmail } from '../utils/email.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDS_FILE = path.join(__dirname, '..', 'data', 'admin_creds.json');

// Read / write the git-tracked admin_creds.json which persists password hashes
// across Replit deployments without requiring Secrets for every admin.
function readAdminCreds() {
  try { return JSON.parse(fs.readFileSync(CREDS_FILE, 'utf-8')); } catch { return {}; }
}
function writeAdminCreds(email, hash) {
  const creds = readAdminCreds();
  creds[email] = hash;
  try { fs.writeFileSync(CREDS_FILE, JSON.stringify(creds, null, 2)); } catch (e) {
    console.error('[Auth] Could not write admin_creds.json:', e.message);
  }
}

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

  const creds = readAdminCreds(); // hashes persisted to git across deploys
  const existing   = getAll('admin_users');
  const superAdmin = existing.find(u => u.email === superEmail);

  // ── Super Admin ──
  if (!superAdmin) {
    // Priority: env var > creds file > temp password
    const persistedHash = !superFromEnv && creds[superEmail];
    const hash = persistedHash || await bcrypt.hash(superPassword, 10);
    insert('admin_users', {
      email: superEmail,
      name: 'Super Admin',
      role: 'super_admin',
      password_hash: hash,
      must_change_password: !superFromEnv && !persistedHash,
      active: true,
    });
    const src = superFromEnv ? 'env var' : persistedHash ? 'saved credentials' : `temp: ${superPassword}`;
    console.log(`[Admin] Created super admin: ${superEmail} — ${src}`);
  } else if (superFromEnv) {
    const isTempPass = superPassword === SUPER_TEMP_PASS;
    if (isTempPass && !superAdmin.must_change_password) {
      // User already set a real password (must_change_password cleared) — don't overwrite with temp
    } else {
      const match = await bcrypt.compare(superPassword, superAdmin.password_hash);
      if (!match) {
        const hash = await bcrypt.hash(superPassword, 10);
        update('admin_users', superAdmin.id, { password_hash: hash, must_change_password: isTempPass, password_changed_at: new Date().toISOString() });
        console.log(`[Admin] Synced super admin password from ADMIN_SUPER_PASSWORD${isTempPass ? ' (temp — will prompt change)' : ''}`);
      } else if (isTempPass && !superAdmin.must_change_password) {
        update('admin_users', superAdmin.id, { must_change_password: true });
      }
    }
  } else if (!superFromEnv && creds[superEmail] && superAdmin.must_change_password) {
    // Creds file has a saved hash from a previous session — restore it
    update('admin_users', superAdmin.id, { password_hash: creds[superEmail], must_change_password: false });
    console.log(`[Admin] Restored super admin password from admin_creds.json`);
  }
  // NOTE: No migration branch that resets passwords.

  // Remove old email if it exists
  const oldEntry = existing.find(u => u.email === 'dipamawenmanelie@gmail.com');
  if (oldEntry) remove('admin_users', oldEntry.id);

  // ── Second Admin ──
  const secondAdmin = existing.find(u => u.email === secondEmail);
  if (!secondAdmin) {
    const persistedHash = !secondFromEnv && creds[secondEmail];
    const hash = persistedHash || await bcrypt.hash(secondPassword, 10);
    insert('admin_users', {
      email: secondEmail,
      name: 'Wenmane',
      role: 'manager',
      password_hash: hash,
      must_change_password: !secondFromEnv && !persistedHash,
      active: true,
    });
    const src = secondFromEnv ? 'env var' : persistedHash ? 'saved credentials' : `temp: ${secondPassword}`;
    console.log(`[Admin] Created admin account: ${secondEmail} — ${src}`);
  } else if (secondFromEnv) {
    const isTempPass = secondPassword === SECOND_TEMP_PASS;
    if (isTempPass && !secondAdmin.must_change_password) {
      // User already set a real password (must_change_password cleared) — don't overwrite with temp
    } else {
      const match = await bcrypt.compare(secondPassword, secondAdmin.password_hash);
      if (!match) {
        const hash = await bcrypt.hash(secondPassword, 10);
        update('admin_users', secondAdmin.id, { password_hash: hash, must_change_password: isTempPass, password_changed_at: new Date().toISOString() });
        console.log(`[Admin] Synced second admin password from ADMIN_SECOND_PASSWORD${isTempPass ? ' (temp — will prompt change)' : ''}`);
      } else if (isTempPass && !secondAdmin.must_change_password) {
        update('admin_users', secondAdmin.id, { must_change_password: true });
      }
    }
  } else if (!secondFromEnv && creds[secondEmail] && secondAdmin.must_change_password) {
    // Restore from creds file
    update('admin_users', secondAdmin.id, { password_hash: creds[secondEmail], must_change_password: false });
    console.log(`[Admin] Restored second admin password from admin_creds.json`);
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
    // Persist hash to git-tracked file so it survives deploys without needing Secrets
    writeAdminCreds(adminUser.email, newHash);

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

// ── POST /admin/auth/forgot-password ─────────────────────────
router.post('/auth/forgot-password', adminAuthLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) return res.status(400).json({ error: 'Email requis.' });
    const normalizedEmail = email.trim().toLowerCase();

    const adminUser = getOneWhere('admin_users', 'email', normalizedEmail);
    if (!adminUser) return res.json({ message: 'Si ce compte existe, vous recevrez un lien.' });

    // Invalidate existing tokens
    getAll('password_reset_tokens')
      .filter(t => t.email === normalizedEmail && t.type === 'admin' && !t.used)
      .forEach(t => remove('password_reset_tokens', t.id));

    const token = crypto.randomBytes(32).toString('hex');
    const expires_at = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    insert('password_reset_tokens', { email: normalizedEmail, token, type: 'admin', expires_at, used: false });

    const result = await sendPasswordResetEmail(normalizedEmail, token, 'admin');
    res.json({
      message: 'Si ce compte existe, vous recevrez un lien de réinitialisation.',
      ...(result.link ? { reset_link: result.link } : {}),
    });
  } catch (err) {
    console.error('Admin forgot password error:', err.message);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// ── POST /admin/auth/reset-password ──────────────────────────
router.post('/auth/reset-password', adminAuthLimiter, async (req, res) => {
  try {
    const { token, new_password } = req.body;
    if (!token || !new_password) return res.status(400).json({ error: 'Token et mot de passe requis.' });
    if (new_password.length < 8) return res.status(400).json({ error: 'Minimum 8 caractères.' });

    const record = getAll('password_reset_tokens').find(t => t.token === token && t.type === 'admin' && !t.used);
    if (!record) return res.status(400).json({ error: 'Lien invalide ou expiré.' });
    if (new Date(record.expires_at) < new Date()) {
      remove('password_reset_tokens', record.id);
      return res.status(400).json({ error: 'Ce lien a expiré. Faites une nouvelle demande.' });
    }

    const adminUser = getOneWhere('admin_users', 'email', record.email);
    if (!adminUser) return res.status(400).json({ error: 'Compte introuvable.' });

    const newHash = await bcrypt.hash(new_password, 10);
    update('admin_users', adminUser.id, { password_hash: newHash, must_change_password: false, password_changed_at: new Date().toISOString() });
    update('password_reset_tokens', record.id, { used: true });
    writeAdminCreds(adminUser.email, newHash);

    // Also sync the linked user account
    const existingUser = getOneWhere('users', 'email', adminUser.email);
    if (existingUser) update('users', existingUser.id, { password_hash: newHash });

    res.json({ success: true, message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) {
    console.error('Admin reset password error:', err.message);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

export default router;
