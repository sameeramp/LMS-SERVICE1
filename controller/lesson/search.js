import mongoose from 'mongoose';
import { Lesson } from '../../models/lesson.js';

export const searchLesson = async (req, res) => {
    try {
        const {
            search,
        } = req.params;              
        if(!search.trim()) return res.status(409).send('No search is passed, please check the searchs')
        // Check lesson exists or not   
        const lessonRes = await Lesson.findOne({lesson: { $regex: search, $options: 'i' }});        
        if (!lessonRes) return res.status(409).send('No recorde found, please check the id')
        return res.status(200).json({...lessonRes?._doc, msg: "Fetched Successfulyy"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}