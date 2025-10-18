import mongoose from 'mongoose';
import { Course } from '../../models/course.js';

export const deleteCourse = async (req, res) => {
    try {
        const {
            id,
        } = req.query;      
        if(!id) return res.status(409).send('No id passed, please check the id')
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);        
        // Check course exists or not and delete   
        const courseRes = await Course.deleteOne({_id});        
        if (courseRes.deletedCount !== 1) return res.status(409).send('Deletion failed, please check the id')
        return res.status(200).json({...courseRes, msg: "Deleted Successfulyy"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}