import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'greenfco_secret_key_2024';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set — using insecure default. Set JWT_SECRET in .env before production.');
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non authentifié.' });
  }
  const token = authHeader.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Session expirée. Veuillez vous reconnecter.' });
  }
}
