import express from 'express';
const router = express.Router();

router.post('/create', createCourse);
router.get('/:search', searchCourse);

export default router;