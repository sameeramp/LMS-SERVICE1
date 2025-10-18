import mongoose from 'mongoose';
import { User } from '../../models/user.js';
import { Course } from '../../models/course.js';
import { UserLesson } from '../../models/userLesson.js';

export const joinCourseUser = async (req, res) => {
    try {
        const {
            course,
            userId
        } = req.body;
        if (!course.trim() || !userId) return res.status(409).send('user id or course is missing');
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(userId);
        const courseId = new mongoose.Types.ObjectId(course);
        // Check user exists or not   
        const userRes = await User.findById(_id);
        const courseRes = await Course.findById({ _id: courseId });
        if (!userRes || !courseRes) return res.status(409).send('No record found, please check the id');
        const userLessonUpdate = await UserLesson.updateOne({user: _id}, {$addToSet: {course: courseId }}, { upsert: true });
        const {modifiedCount} = userLessonUpdate;
        if (modifiedCount < 1) return res.status(409).send('User Lesson is not updated, maybe course already added');
        return res.status(200).json({ course, userId, msg: "Updated Successfulyy" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}