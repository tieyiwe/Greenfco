import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// ── Startup checks ────────────────────────────────────────────
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  const required = ['JWT_SECRET'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    console.error(`❌ Missing required env vars in production: ${missing.join(', ')}`);
    console.error('   Set them in Replit Secrets (🔒) and restart.');
    process.exit(1);
  }
}
if (!process.env.JWT_SECRET) console.warn('⚠️  JWT_SECRET not set — using insecure default.');

import authRoutes from './routes/auth.js';
import cropsRoutes from './routes/crops.js';
import financeRoutes from './routes/finance.js';
import marketRoutes from './routes/market.js';
import aiRoutes from './routes/ai.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import consultingRoutes from './routes/consulting.js';
import adminAuthRoutes from './routes/adminAuth.js';
import adminApiRoutes from './routes/adminApi.js';
import { getAll, initPersistence } from './db/store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const publicDir = path.join(__dirname, 'public');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "data:"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());

const isDev = process.env.NODE_ENV !== 'production';
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(s => s.trim())
  : isDev ? true : false;
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// ── Request logger ────────────────────────────────────────────
app.use((req, _res, next) => {
  if (!req.path.startsWith('/api')) return next();
  const start = Date.now();
  _res.on('finish', () => {
    const ms = Date.now() - start;
    const color = _res.statusCode >= 500 ? '\x1b[31m' : _res.statusCode >= 400 ? '\x1b[33m' : '\x1b[32m';
    console.log(`${color}${req.method} ${req.path} ${_res.statusCode}\x1b[0m — ${ms}ms`);
  });
  next();
});

// API routes
app.use('/api/auth',        authRoutes);
app.use('/api/crops',       cropsRoutes);
app.use('/api/finance',     financeRoutes);
app.use('/api/market',      marketRoutes);
app.use('/api/ai', express.json({ limit: '8mb' }), aiRoutes);
app.use('/api/contact',     contactRoutes);
app.use('/api/newsletter',  newsletterRoutes);
app.use('/api/consulting',  consultingRoutes);
app.use('/api/admin',       adminAuthRoutes);
app.use('/api/admin/data',  adminApiRoutes);

// Public gallery endpoint (no auth required — used by public Gallery page)
app.get('/api/gallery', (req, res) => {
  res.json(getAll('gallery').reverse());
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV || 'development' });
});

// ── Global error handler ──────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  console.error(`[Error] ${req.method} ${req.path} →`, err.message);
  res.status(status).json({
    error: isProd ? 'Une erreur est survenue.' : err.message,
  });
});

// Serve built React app
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir, { index: 'index.html' }));
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      res.status(404).json({ error: 'Not found' });
    } else {
      res.sendFile(path.join(publicDir, 'index.html'));
    }
  });
} else {
  app.get('/', (_, res) => res.send('GreenFCO API is running. Frontend not built yet.'));
}

// Load persisted data (Replit DB or local file) before accepting requests
initPersistence().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 GreenFCO Server on port ${PORT}`);
    console.log(`   Frontend dir : ${publicDir}`);
    console.log(`   index.html   : ${fs.existsSync(path.join(publicDir, 'index.html')) ? '✅ found' : '❌ MISSING — run: cd client && npm install && npm run build'}`);
    if (process.env.REPLIT_DB_URL) {
      console.log('   Persistence  : ✅ Replit Database (survives deployments)');
    } else {
      console.log('   Persistence  : ⚠️  Local db.json only (set REPLIT_DB_URL for deploy persistence)');
    }
  });
}).catch(err => {
  console.error('[Server] Failed to initialise persistence:', err.message);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received — shutting down gracefully');
  process.exit(0);
});
process.on('uncaughtException', (err) => {
  console.error('[Server] Uncaught exception:', err.message);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('[Server] Unhandled rejection:', reason);
});
