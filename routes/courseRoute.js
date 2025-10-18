import express from 'express';
import { verifyToken } from '../middleware/auth';
const router = express.Router();

const courseRoute = () => {
router.post('/create', verifyToken, createCourse);
router.get('/:search', verifyToken, searchCourse);
}

export default courseRoute;