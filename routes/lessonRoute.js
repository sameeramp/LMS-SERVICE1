import express from 'express';
const router = express.Router();

router.post('/create', createLesson);
router.get('/:search', searchLesson);

export default router;