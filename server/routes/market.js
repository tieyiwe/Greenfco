import { Router } from 'express';
import { insert, getById, getAll, remove } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  const listings = getAll('market').filter(l => l.active !== false);
  res.json(listings.reverse());
});

router.post('/', authMiddleware, (req, res) => {
  const { title, price, unit, category, description, quantity, location,
          seller_name, seller_email, seller_phone, image_url, currency } = req.body;
  if (!title?.trim()) return res.status(400).json({ message: 'Title required' });
  const listing = insert('market', {
    title: title.trim().slice(0, 200),
    price: parseFloat(price) || 0,
    unit: (unit || '').trim().slice(0, 50),
    category: (category || '').trim().slice(0, 100),
    description: (description || '').trim().slice(0, 2000),
    quantity: parseInt(quantity) || null,
    location: (location || '').trim().slice(0, 200),
    seller_name: (seller_name || '').trim().slice(0, 100),
    seller_email: (seller_email || '').trim().toLowerCase().slice(0, 254),
    seller_phone: (seller_phone || '').trim().slice(0, 30),
    image_url: (image_url || '').trim().slice(0, 500),
    currency: (currency || 'XOF').trim().slice(0, 10),
    user_id: req.user.id,
    active: true,
  });
  res.status(201).json(listing);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const existing = getById('market', parseInt(req.params.id));
  if (!existing) return res.status(404).json({ message: 'Not found' });
  if (existing.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  remove('market', parseInt(req.params.id));
  res.json({ success: true });
});

export default router;
