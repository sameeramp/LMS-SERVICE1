import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createCourse } from '../controller/course/create.js';
import { updateCourse } from '../controller/course/update.js';
import { deleteCourse } from '../controller/course/delete.js';
import { getOneCourse } from '../controller/course/getOne.js';
import { getAllCourse } from '../controller/course/geAll.js';
import { searchCourse } from '../controller/course/search.js';
const router = express.Router();

router.post('/create', verifyToken, createCourse);
router.put('/update', verifyToken, updateCourse);
router.delete('/delete', verifyToken, deleteCourse);
router.get('/get-one', verifyToken, getOneCourse);
router.get('/get-all', verifyToken, getAllCourse);
router.get('/:search', verifyToken, searchCourse);

export default router;