import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getOneUser } from '../controller/user/getOne.js';
import { joinCourseUser } from '../controller/user/joinCourse.js';
import { addLessonUser } from '../controller/user/addLesson.js';
import { completeLessonUser } from '../controller/user/completeLesson.js';
const router = express.Router();

router.get('/get-one', verifyToken, getOneUser); 
router.post('/course', verifyToken, joinCourseUser);
router.post('/lesson', verifyToken, addLessonUser);
router.post('/lessons/:id/complete', verifyToken, completeLessonUser);

export default router;