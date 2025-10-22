import mongoose from 'mongoose';
import { UserLesson } from '../../models/userLesson.js';
import { Course } from '../../models/course.js';
import { Lesson } from '../../models/lesson.js';

export const getStatsLesson = async (req, res) => {
    try {
        const {
            id,
            courseId,
            lessonId,
        } = req.body;
        if (!id  || !courseId || !lessonId) return res.status(409).send('No id passed, please check the id');
        // convert to mongo id
        const user = new mongoose.Types.ObjectId(id);
        const mongoCourseId = new mongoose.Types.ObjectId(courseId);
        const mongoLessonId = new mongoose.Types.ObjectId(lessonId);
        // Check user exists or not   
        const userLesson = await UserLesson.findOne({ user, course: mongoCourseId, "progress.lesson": mongoLessonId });
        return res.status(200).json({ userLesson, msg: "Data fetched successfully" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}