import { Router } from 'express';
import { insert, getById, getWhere, remove } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  try {
    const entries = getWhere('finance', 'user_id', req.user.id);
    res.json(entries.reverse());
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/', (req, res) => {
  try {
    const entry = insert('finance', { ...req.body, user_id: req.user.id });
    res.status(201).json(entry);
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const existing = getById('finance', parseInt(req.params.id));
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    remove('finance', parseInt(req.params.id));
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;
