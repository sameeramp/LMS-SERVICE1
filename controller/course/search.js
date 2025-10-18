import mongoose from 'mongoose';
import { Course } from '../../models/course.js';

export const searchCourse = async (req, res) => {
    try {
        const {
            search,
        } = req.params;  
        console.log(search, 'search');
            
        if(!search.trim()) return res.status(409).send('No search is passed, please check the searchs')
        // Check course exists or not   
        const courseRes = await Course.findOne({course: { $regex: search, $options: 'i' }});        
        if (!courseRes) return res.status(409).send('No recorde found, please check the id')
        return res.status(200).json({...courseRes?._doc, msg: "Fetched Successfulyy"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}