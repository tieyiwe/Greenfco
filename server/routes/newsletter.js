import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { insert, getOneWhere } from '../db/store.js';

const router = Router();

const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Trop de soumissions. Réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/subscribe', newsletterLimiter, (req, res) => {
  const { email, language } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ message: 'Email invalide.' });
  const existing = getOneWhere('newsletter', 'email', email);
  if (!existing) {
    insert('newsletter', { email, language: language || 'fr' });
  }
  res.json({ success: true });
});

export default router;
