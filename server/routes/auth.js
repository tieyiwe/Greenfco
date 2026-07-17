import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { insert, getOneWhere } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

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
        // Create a linked user account so dashboard data persists
        user = insert('users', {
          name: adminUser.name,
          email: adminUser.email,
          password_hash: adminUser.password_hash,
          user_type: 'expert',
          language: 'fr',
          country: '',
          status: 'active',
          is_admin: true,
        });
      } else {
        return res.status(401).json({ message: 'Identifiants incorrects.' });
      }
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

router.post('/forgot-password', (req, res) => {
  // Email sending would go here with a real email provider
  res.json({ message: 'Si ce compte existe, un email de réinitialisation a été envoyé.' });
});

export default router;
