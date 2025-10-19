import mongoose from 'mongoose';
import { Course } from '../../models/course.js';

export const getOneCourse = async (req, res) => {
    try {
        const {
            id,
        } = req.params;      
        if(!id) return res.status(409).send('No id passed, please check the id')
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);        
        // Check course exists or not   
        const courseRes = await Course.findById({_id}); 
        if (!courseRes) return res.status(409).send('No recorde found, please check the id')
        return res.status(200).json({...courseRes?._doc, msg: "Fetched Successfulyy"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}