import { Router } from 'express';
import { insert, getOneWhere } from '../db/store.js';

const router = Router();

router.post('/subscribe', (req, res) => {
  const { email, language } = req.body;
  if (!email) return res.status(400).json({ message: 'Email requis.' });
  const existing = getOneWhere('newsletter', 'email', email);
  if (!existing) {
    insert('newsletter', { email, language: language || 'fr' });
  }
  res.json({ success: true });
});

export default router;
