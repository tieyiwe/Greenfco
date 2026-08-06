import { Router } from 'express';
import { insert, getById, getWhere, remove, update } from '../db/store.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  try {
    const crops = getWhere('crops', 'user_id', req.user.id);
    res.json(crops.reverse());
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/', (req, res) => {
  try {
    const crop = insert('crops', { ...req.body, user_id: req.user.id });
    res.status(201).json(crop);
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const existing = getById('crops', parseInt(req.params.id));
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    const updated = update('crops', parseInt(req.params.id), req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const existing = getById('crops', parseInt(req.params.id));
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    remove('crops', parseInt(req.params.id));
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;
