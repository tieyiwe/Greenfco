import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { insert, getOneWhere } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'greenfco_secret_key_2024';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, country, user_type, language } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }
    const existing = getOneWhere('users', 'email', email);
    if (existing) {
      return res.status(409).json({ message: 'Un compte avec cet e-mail existe déjà.' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = insert('users', { name, email, password_hash, country, user_type: user_type || 'farmer', language: language || 'fr' });
    const { password_hash: _, ...safeUser } = user;
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = getOneWhere('users', 'email', email);
    if (!user) return res.status(401).json({ message: 'Identifiants incorrects.' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Identifiants incorrects.' });
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
  const { password_hash: _, ...safeUser } = user;
  res.json(safeUser);
});

router.post('/forgot-password', (req, res) => {
  // Email sending would go here
  res.json({ message: 'Si ce compte existe, un email de réinitialisation a été envoyé.' });
});

export default router;
