import express from 'express';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/create', verifyToken, createLesson);
router.get('/:search', verifyToken, searchLesson);

export default router;