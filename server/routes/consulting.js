import { Router } from 'express';

const router = Router();

// POST /api/consulting — store appointment request
router.post('/', (req, res) => {
  const { name, email, phone, service, date, time, message, language, country } = req.body;
  if (!name || !email || !service || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // TODO: persist to database when available
  console.log(`[Consulting] New request from ${country || 'unknown country'} — service: ${service}, date: ${date}`);
  res.json({ success: true, message: 'Appointment request received' });
});

export default router;
