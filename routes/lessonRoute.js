import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createLesson } from '../controller/lesson/create.js';
import { updateLesson } from '../controller/lesson/update.js';
import { deleteLesson } from '../controller/lesson/delete.js';
import { getOneLesson } from '../controller/lesson/getOne.js';
import { getAllLesson } from '../controller/lesson/geAll.js';
import { searchLesson } from '../controller/lesson/search.js';
import { getByCourseLesson } from '../controller/lesson/getByCourseLesson.js';
import { similarLesson } from '../controller/lesson/similar.js';
const router = express.Router();

router.post('/create', verifyToken, createLesson);
router.put('/update', verifyToken, updateLesson);
router.delete('/delete', verifyToken, deleteLesson);
router.get('/get-one', verifyToken, getOneLesson);
router.get('/get-by-course', verifyToken, getByCourseLesson);
router.get('/get-all', verifyToken, getAllLesson);
router.get('/:search', verifyToken, searchLesson);
router.get('/:id/similar', verifyToken, similarLesson);

export default router;