import mongoose from 'mongoose';
import { Lesson } from '../../models/lesson.js';

export const getByCourseLesson = async (req, res) => {
    try {
        const {
            id,
            page = 1,
            perPage = 10
        } = req.query;      
        if(!id) return res.status(409).send('No id passed, please check the id')
        const limit = perPage;
        const skip = (page - 1) * perPage;
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);        
        // Check lesson exists or not   
        const lessonRes = await Lesson.find({course: _id}).skip(skip).limit(limit);        
        if (!lessonRes) return res.status(409).send('No recorde found, please check the course id')
        return res.status(200).json({...lessonRes?._doc, msg: "Fetched Successfulyy"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}