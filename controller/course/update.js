import mongoose from 'mongoose';
import { Course } from '../../models/course.js';

export const updateCourse = async (req, res) => {
    try {
        const {
            id,
            course,
        } = req.body;

        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);        
        // Check course exists or not
        const courseData = await Course.findById({_id});        
        if (!courseData) return res.status(409).send('Course is not found, please check the id')
        const courseRes = await Course.findByIdAndUpdate({_id}, {course}, {new: true});
        return res.status(200).json({...courseRes._doc, msg: "Updated Successfulyy"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}