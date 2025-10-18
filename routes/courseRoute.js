import express from 'express';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/create', verifyToken, createCourse);
router.get('/:search', verifyToken, searchCourse);

export default router;