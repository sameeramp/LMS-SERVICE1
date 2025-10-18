import { Course } from '../../models/course.js';

export const createCourse = async (req, res) => {
    try {
        const {
            course,
        } = req.body;

        // Check course exists or not
        const courseData = await Course.findOne({ course })
        if (courseData) return res.status(409).send('Course is already registered, Please try other')
        const coursePayload = await Course.create({ course });
        const courseRes = await coursePayload.save();
        return res.status(201).json({...courseRes._doc, msg: "Created Successfully"});
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}