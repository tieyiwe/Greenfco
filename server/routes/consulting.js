import { Router } from 'express';
import { insert } from '../db/store.js';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, phone, service, date, time, message, language, country } = req.body;
  if (!name || !email || !service || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  insert('consulting', { name, email, phone, service, date, time, message, language, country });
  res.json({ success: true, message: 'Appointment request received' });
});

export default router;
