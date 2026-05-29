import { Router } from 'express';
import { insert } from '../db/store.js';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, subject, message, country } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Champs requis manquants.' });
  }
  insert('contact', { name, email, subject, message, country });
  res.json({ success: true });
});

export default router;
