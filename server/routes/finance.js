import { Router } from 'express';
import { insert, getWhere, remove } from '../db/store.js';
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
    remove('finance', parseInt(req.params.id));
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;
