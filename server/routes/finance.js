import { Router } from 'express';
import { insert, getWhere, remove } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  const entries = getWhere('finance', 'user_id', req.user.id);
  res.json(entries.reverse());
});

router.post('/', (req, res) => {
  const entry = insert('finance', { ...req.body, user_id: req.user.id });
  res.status(201).json(entry);
});

router.delete('/:id', (req, res) => {
  remove('finance', parseInt(req.params.id));
  res.json({ success: true });
});

export default router;
