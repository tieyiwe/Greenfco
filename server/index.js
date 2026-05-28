import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import cropsRoutes from './routes/crops.js';
import financeRoutes from './routes/finance.js';
import marketRoutes from './routes/market.js';
import aiRoutes from './routes/ai.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropsRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'GreenFCO API is running 🌿' }));

app.listen(PORT, () => {
  console.log(`🌿 GreenFCO Server running on port ${PORT}`);
});
