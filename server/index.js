import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import cropsRoutes from './routes/crops.js';
import financeRoutes from './routes/finance.js';
import marketRoutes from './routes/market.js';
import aiRoutes from './routes/ai.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const publicDir = path.join(__dirname, 'public');

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(s => s.trim())
  : true;
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth',       authRoutes);
app.use('/api/crops',      cropsRoutes);
app.use('/api/finance',    financeRoutes);
app.use('/api/market',     marketRoutes);
app.use('/api/ai',         aiRoutes);
app.use('/api/contact',    contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.get('/api/health',     (_, res) => res.json({ status: 'GreenFCO API running 🌿' }));

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌿 GreenFCO Server on port ${PORT}`);
  console.log(`   Frontend dir : ${publicDir}`);
  console.log(`   index.html   : ${fs.existsSync(path.join(publicDir, 'index.html')) ? '✅ found' : '❌ MISSING — run: cd client && npm install && npm run build'}`);
});
