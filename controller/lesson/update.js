import mongoose from 'mongoose';
import { Lesson } from '../../models/lesson.js';
import { Course } from '../../models/course.js';

export const updateLesson = async (req, res) => {
    try {
        const {
            id,
            lesson,
            content,
            course,
        } = req.body;

        if (!content.trim()) return res.status(409).send('No Lesson content is found');
        const courseId = mongoose.Types.ObjectId(course);
        const _id = mongoose.Types.ObjectId(id);
        // Check Lesson exists or not
        if (course.trim()) {
            const courseData = await Course.findById(courseId);
            if (!courseData) return res.status(409).send('Course is not found')
        }
        const lessonData = await Lesson.findById({ _id });
        if (!lessonData) return res.status(409).send('Lesson is not found, please check the id')
        const payload = {};
        if (course.trim()) payload[course] = courseId;
        if (content.trim()) payload[content] = content;
        if (lesson.trim()) payload[lesson] = lesson;
        const lessonRes = await Lesson.findByIdAndUpdate({ _id }, payload, { new: true });
        return res.status(200).json({ ...lessonRes._doc, msg: "Updated Successfulyy" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}