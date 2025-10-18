import express from 'express';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

const lessionRoute = () => {
router.post('/create', verifyToken, createLesson);
router.get('/:search', verifyToken, searchLesson);
}

export default lessionRoute;