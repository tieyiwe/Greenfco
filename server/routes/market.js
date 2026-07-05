import { Router } from 'express';
import { insert, getById, getAll, remove } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  const listings = getAll('market').filter(l => l.active !== false);
  res.json(listings.reverse());
});

router.post('/', authMiddleware, (req, res) => {
  const listing = insert('market', { ...req.body, user_id: req.user.id, active: true });
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
