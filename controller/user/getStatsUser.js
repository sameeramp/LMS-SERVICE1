import mongoose from 'mongoose';
import { UserLesson } from '../../models/userLesson.js';
import { Course } from '../../models/course.js';
import { Lesson } from '../../models/lesson.js';

export const getStatsUser = async (req, res) => {
    try {
        const {
            id,
        } = req.params;
        if (!id) return res.status(409).send('No id passed, please check the id')
        // convert to mongo id
        const user = new mongoose.Types.ObjectId(id);
        // Check user exists or not   
        const userLessonRes = await UserLesson.findOne({ user });
        if (!userLessonRes) return res.status(409).send('No record found, please check the id');
        const { progress, course } = userLessonRes || userLessonRes?._doc;
        const stats = [];
        for (let i = 0; i < course.length; i++) {
            const courseId = course[i];
            const courseObjId = new mongoose.Types.ObjectId(courseId);
            const courseRes = await Course.findById({ _id: courseObjId });
            const { course: courseName } = courseRes;
            const lessonDoc = await Lesson.find({ course: courseObjId });
            const totalLessons = lessonDoc.length | 0;
            const ids = new Set(lessonDoc.map(obj => obj._id.toString()));
            const matched = progress.filter(elem => ids.has(elem.lesson.toString()));
            const attendedLessons = matched.length | 0;
            const completedLessons = matched.filter(obj => obj.completed);
            const attendedPercentage = (attendedLessons / totalLessons) * 100;
            const completetedLessonLen = completedLessons.length | 0;
            const completedPercentage = (completetedLessonLen / totalLessons) * 100;
            const payload = { [courseName]: [{ totalLessons }, { attendedLessons }, { completedLessons: completetedLessonLen }, { attendedPercentage }, { completedPercentage }] }
            stats.push(payload);
        }
        return res.status(200).json({ stats, msg: "Data fetched successfully" });
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}