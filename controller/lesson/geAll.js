import mongoose from 'mongoose';
import { Lesson } from '../../models/lesson.js';

export const getAllLesson = async (req, res) => {
    try {
        const {
            page = 1,
            perPage = 10
        } = req.query;
        const limit = perPage;
        const skip = (page - 1) * perPage;
        const lessonRes = await Lesson.find().skip(skip).limit(limit);
        if (!lessonRes) return res.status(409).send('No recorde found, please check the id')
        return res.status(200).json({ lesson: lessonRes, msg: "Fetched Successfulyy" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}