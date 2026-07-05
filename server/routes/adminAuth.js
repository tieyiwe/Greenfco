import { Router } from 'express';
import rateLimit from 'express-rate-limit';

const router = Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'greenfco_admin_2024';

if (!process.env.ADMIN_PASSWORD) {
  console.warn('⚠️  ADMIN_PASSWORD not set — using insecure default. Set ADMIN_PASSWORD in .env before production.');
}

const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/auth', adminAuthLimiter, (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' });
  }
  res.json({ success: true });
});

export default router;
