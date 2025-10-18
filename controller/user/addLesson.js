import mongoose from 'mongoose';
import { User } from '../../models/user.js';
import { Course } from '../../models/course.js';
import { UserLesson } from '../../models/userLesson.js';
import { Lesson } from '../../models/lesson.js';

export const addLessonUser = async (req, res) => {
    try {
        const {
            course,
            userId,
            lesson
        } = req.body;
        if (!course.trim() || !userId.trim() || !lesson.trim()) return res.status(409).send('user id or course or lesson is missing');
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(userId);
        const courseId = new mongoose.Types.ObjectId(course);
        const lessonId = new mongoose.Types.ObjectId(lesson);
        // Check user exists or not   
        const userRes = await User.findById(_id);
        const courseRes = await Course.findById({ _id: courseId });
        const lessonRes = await Lesson.findById({ _id: lessonId });        
        if (!userRes || !courseRes || !lessonRes) return res.status(409).send('No record found, please check the ids');
        const userLessonUpdate = await UserLesson.updateOne({user: _id, course: courseId}, {$set: { "progress.$.lesson": lessonId, "progress.$.completed": false }});
        const {modifiedCount} = userLessonUpdate;
        if (modifiedCount < 1) return res.status(409).send('User Lesson is not updated, maybe lesson already updated');
        return res.status(200).json({ course, userId, lesson, msg: "Updated Successfulyy" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}