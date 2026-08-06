import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import { insert, getOneWhere, getAll, update, remove } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';
import { sendPasswordResetEmail } from '../utils/email.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'greenfco_secret_key_2024';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Trop de tentatives. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
router.use('/login',    authLimiter);
router.use('/register', authLimiter);

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, country, user_type, language } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existing = getOneWhere('users', 'email', normalizedEmail);
    if (existing) {
      return res.status(409).json({ message: 'Un compte avec cet e-mail existe déjà.' });
    }
    if (getOneWhere('admin_users', 'email', normalizedEmail)) {
      return res.status(409).json({ message: 'Un compte avec cet e-mail existe déjà.' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = insert('users', {
      name: name.trim(),
      email: normalizedEmail,
      password_hash,
      country: country?.trim() || '',
      user_type: user_type || 'farmer',
      language: language || 'fr',
      status: 'active',
    });
    const { password_hash: _, ...safeUser } = user;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: safeUser, token });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }
    const normalizedEmail = email.trim().toLowerCase();
    let user = getOneWhere('users', 'email', normalizedEmail);

    if (!user) {
      // Fallback: check if this is an admin logging in as a user
      const adminUser = getOneWhere('admin_users', 'email', normalizedEmail);
      if (adminUser && adminUser.active && !adminUser.must_change_password) {
        const valid = await bcrypt.compare(password, adminUser.password_hash);
        if (!valid) return res.status(401).json({ message: 'Identifiants incorrects.' });
        // Create linked user account if it doesn't exist yet (safety net —
        // change-password normally creates it, but guard against edge cases)
        user = getOneWhere('users', 'email', normalizedEmail) || insert('users', {
          name: adminUser.name,
          email: adminUser.email,
          password_hash: adminUser.password_hash,
          user_type: 'expert',
          language: 'fr',
          country: '',
          status: 'active',
          is_admin: true,
        });
        // Password already verified above — issue token directly
        const { password_hash: _, ...safeUser } = user;
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({ user: safeUser, token });
      }
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ message: 'Votre compte a été suspendu. Contactez le support.' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }
    const { password_hash: _, ...safeUser } = user;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: safeUser, token });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  const user = getOneWhere('users', 'id', req.user.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });
  if (user.status === 'suspended') return res.status(403).json({ message: 'Compte suspendu.' });
  const { password_hash: _, ...safeUser } = user;
  res.json(safeUser);
});

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Trop de tentatives. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/forgot-password', resetLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) return res.status(400).json({ message: 'Email requis.' });
    const normalizedEmail = email.trim().toLowerCase();

    // Always respond with success to avoid revealing whether email exists
    const user = getOneWhere('users', 'email', normalizedEmail);
    if (!user) return res.json({ message: 'Si ce compte existe, vous recevrez un lien de réinitialisation.' });

    // Invalidate any existing tokens for this email
    const existing = getAll('password_reset_tokens').filter(t => t.email === normalizedEmail && !t.used);
    existing.forEach(t => remove('password_reset_tokens', t.id));

    const token = crypto.randomBytes(32).toString('hex');
    const expires_at = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour
    insert('password_reset_tokens', { email: normalizedEmail, token, type: 'user', expires_at, used: false });

    const result = await sendPasswordResetEmail(normalizedEmail, token, 'user');

    res.json({
      message: 'Si ce compte existe, vous recevrez un lien de réinitialisation.',
      // Only expose link when email is not configured (dev/no-SMTP mode)
      ...(result.link ? { reset_link: result.link } : {}),
    });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/reset-password', resetLimiter, async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ message: 'Token et mot de passe requis.' });
    if (password.length < 8) return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });

    const record = getAll('password_reset_tokens').find(t => t.token === token && t.type === 'user' && !t.used);
    if (!record) return res.status(400).json({ message: 'Lien invalide ou expiré.' });
    if (new Date(record.expires_at) < new Date()) {
      remove('password_reset_tokens', record.id);
      return res.status(400).json({ message: 'Ce lien a expiré. Faites une nouvelle demande.' });
    }

    const user = getOneWhere('users', 'email', record.email);
    if (!user) return res.status(400).json({ message: 'Compte introuvable.' });

    const password_hash = await bcrypt.hash(password, 10);
    update('users', user.id, { password_hash });
    update('password_reset_tokens', record.id, { used: true });

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;
