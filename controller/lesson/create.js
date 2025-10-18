import mongoose from 'mongoose';
import { Course } from '../../models/course.js';
import { Lesson } from '../../models/lesson.js';

export const createLesson = async (req, res) => {
    try {
        const {
            lesson,
            course,
            content,
        } = req.body;

        if (!course.trim()) return res.status(409).send('Course is not found');
        if (!content.trim()) return res.status(409).send('No Lesson content is found');
        const courseId = mongoose.Types.ObjectId(course);
        // Check Lesson exists or not
        const lessonData = await Lesson.findOne({ lesson })
        const courseData = await Course.findById(courseId);
        if(!courseData) return res.status(409).send('Course is not found')
        if (lessonData) return res.status(409).send('Lesson is already registered, Please try other')
        const lessonDataPayload = await Lesson.create({ lesson, course: courseId, content });
        const lessonRes = await lessonDataPayload.save();
        return res.status(201).json({...lessonRes._doc, msg: "Created Successfully"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}