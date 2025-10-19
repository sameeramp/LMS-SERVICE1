import mongoose from 'mongoose';
import { Lesson } from '../../models/lesson.js';

// For Fetching Similar Lessons Fetching All Lesson Under the Same Course ID
export const similarLesson = async (req, res) => {
    try {
        const {
            id,
        } = req.query;
        if (!id) return res.status(409).send('No id passed, please check the id');        
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);
        const lessonRes = await Lesson.findById({ _id });
        const courseId = lessonRes?.course;
        // convert to mongo id
        const mongoCourseId  = new mongoose.Types.ObjectId(courseId);        
        const lessons = await Lesson.find({_id: {$ne: _id}, course: mongoCourseId});
        if (!lessonRes) return res.status(409).send('No record found, please check the id');
        return res.status(200).json({ similarLessons: lessons, msg: "Fetched Successfulyy" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}