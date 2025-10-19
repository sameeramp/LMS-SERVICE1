import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getUser } from '../controller/user/getUser.js';
import { joinCourseUser } from '../controller/user/joinCourse.js';
import { addLessonUser } from '../controller/user/addLesson.js';
import { completeLessonUser } from '../controller/user/completeLesson.js';
import { getStatsUser } from '../controller/user/getStatsUser.js';
const router = express.Router();

router.get('/get-one', verifyToken, getUser); 
router.get('/:id/stats', verifyToken, getStatsUser);
router.post('/course', verifyToken, joinCourseUser);
router.post('/lesson', verifyToken, addLessonUser);
router.post('/lessons/:id/complete', verifyToken, completeLessonUser);

export default router;