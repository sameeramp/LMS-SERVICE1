import mongoose from 'mongoose';
import { Lesson } from '../../models/lesson.js';

export const updateLesson = async (req, res) => {
    try {
        const {
            id,
            lesson,
        } = req.body;

        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);        
        // Check lesson exists or not
        const lessonData = await Lesson.findById({_id});        
        if (!lessonData) return res.status(409).send('Lesson is not found, please check the id')
        const lessonRes = await Lesson.findByIdAndUpdate({_id}, {lesson}, {new: true});
        return res.status(200).json({...lessonRes._doc, msg: "Updated Successfulyy"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}