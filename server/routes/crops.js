import { Router } from 'express';
import { insert, getWhere, remove, update } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  const crops = getWhere('crops', 'user_id', req.user.id);
  res.json(crops.reverse());
});

router.post('/', (req, res) => {
  const crop = insert('crops', { ...req.body, user_id: req.user.id });
  res.status(201).json(crop);
});

router.put('/:id', (req, res) => {
  const updated = update('crops', parseInt(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  remove('crops', parseInt(req.params.id));
  res.json({ success: true });
});

export default router;
