import jwt from 'jsonwebtoken';

const DEMO_USER = { id: 'demo', name: 'Demo User', email: 'demo@greenfco.com', user_type: 'farmer' };

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    req.user = DEMO_USER;
    return next();
  }
  const token = authHeader.slice(7);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'greenfco_secret_key_2024');
    next();
  } catch {
    req.user = DEMO_USER;
    next();
  }
}
