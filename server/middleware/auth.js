import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'greenfco_secret_key_2024';
const DEMO_USER  = { id: 'demo', name: 'Demo User', email: 'demo@greenfco.com', user_type: 'farmer' };

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set — using insecure default. Set JWT_SECRET in .env before production.');
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    req.user = DEMO_USER;
    return next();
  }
  const token = authHeader.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    req.user = DEMO_USER;
    next();
  }
}
