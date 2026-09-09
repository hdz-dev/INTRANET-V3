import { Router } from 'express';
import { changePassword, currentUser, login, logout } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', currentUser);
router.post('/password/change', requireAuth, changePassword);

export default router;