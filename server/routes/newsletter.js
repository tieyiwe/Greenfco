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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/subscribe', newsletterLimiter, (req, res) => {
  const { email, language } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail || !EMAIL_RE.test(normalizedEmail)) {
    return res.status(400).json({ message: 'Email invalide.' });
  }
  const existing = getOneWhere('newsletter', 'email', normalizedEmail);
  if (!existing) {
    insert('newsletter', { email: normalizedEmail, language: language || 'fr' });
  }
  res.json({ success: true });
});

export default router;
