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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', contactLimiter, (req, res) => {
  const { name, email, subject, message, country } = req.body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'Champs requis manquants.' });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ message: 'Email invalide.' });
  }
  if (name.trim().length > 100) return res.status(400).json({ message: 'Nom trop long.' });
  if (message.trim().length > 5000) return res.status(400).json({ message: 'Message trop long (max 5000 caractères).' });
  if (subject && subject.length > 200) return res.status(400).json({ message: 'Sujet trop long.' });

  insert('contact', {
    name: name.trim().slice(0, 100),
    email: email.trim().toLowerCase().slice(0, 254),
    subject: (subject || '').trim().slice(0, 200),
    message: message.trim().slice(0, 5000),
    country: (country || '').trim().slice(0, 100),
  });
  res.json({ success: true });
});

export default router;
