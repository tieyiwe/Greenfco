import express from 'express';
import cors from 'cors';
import path from 'path';
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

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropsRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'GreenFCO API is running 🌿' }));

// Serve built React frontend
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.get('*', (_, res) => res.sendFile(path.join(publicDir, 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌿 GreenFCO Server running on port ${PORT}`);
});
