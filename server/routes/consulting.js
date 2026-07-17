import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { insert } from '../db/store.js';

const router = Router();

const consultingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Trop de soumissions. Réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', consultingLimiter, (req, res) => {
  try {
    const { name, email, phone, service, date, time, message, language, country } = req.body;
    if (!name?.trim() || !email?.trim() || !service?.trim() || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ error: 'Email invalide.' });
    }
    if (name.trim().length > 100) return res.status(400).json({ error: 'Nom trop long.' });
    if (message && message.length > 3000) return res.status(400).json({ error: 'Message trop long.' });

    insert('consulting', {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 254),
      phone: (phone || '').trim().slice(0, 30),
      service: service.trim().slice(0, 100),
      preferred_date: date,
      preferred_time: time || '',
      message: (message || '').trim().slice(0, 3000),
      language: language || 'fr',
      country: (country || '').trim().slice(0, 100),
    });
    res.json({ success: true, message: 'Appointment request received' });
  } catch {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

export default router;
