import mongoose from 'mongoose';
import { Course } from '../../models/course.js';

// For Fetching Similar Course, Fetch All Course Name and Split by Space and Match Any Words
export const similarCourse = async (req, res) => {
    try {
        const {
            id,
        } = req.query;
        if (!id) return res.status(409).send('No id passed, please check the id')
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);
        const courseRes = await Course.findById({ _id });
        const courseName = courseRes?.course;
        const splittedCourseName = courseName.split(" ");
        const set = new Set();
        for(let i = 0; i < splittedCourseName.length; i ++) {
            const splittedCourseNamePart = splittedCourseName[i].trim();
            if(splittedCourseNamePart) {
                const regex = new RegExp(splittedCourseNamePart, "i");
                const res = await Course.find({_id: { $ne: _id }, course: { $regex: regex }});
                const stringifiedRes = JSON.stringify(...res);
                if(stringifiedRes) set.add(stringifiedRes);
            };
        }
        if (!courseRes) return res.status(409).send('No recorde found, please check the id');
        return res.status(200).json({ similarCourse: [...set], msg: "Fetched Successfulyy" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}