import mongoose from 'mongoose';
import { Course } from '../../models/course.js';

export const getAllCourse = async (req, res) => {
    try {
        const {
            page = 1,
            perPage = 10
        } = req.query;
        const limit = perPage;
        const skip = (page - 1) * perPage;
        const courseRes = await Course.find().skip(skip).limit(limit);
        if (!courseRes) return res.status(409).send('No record found, please check the id')
        return res.status(200).json({ course: courseRes, msg: "Fetched Successfulyy" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}