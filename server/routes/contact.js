import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { insert } from '../db/store.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Trop de soumissions. Réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, (req, res) => {
  const { name, email, subject, message, country } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Champs requis manquants.' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Email invalide.' });
  }
  insert('contact', { name, email, subject, message, country });
  res.json({ success: true });
});

export default router;
