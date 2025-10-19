import mongoose from 'mongoose';
import { User } from '../../models/user.js';

export const getUser = async (req, res) => {
    try {
        const {
            id,
        } = req.query;
        if (!id) return res.status(409).send('No id passed, please check the id')
        // convert to mongo id
        const _id = new mongoose.Types.ObjectId(id);
        // Check user exists or not   
        const userRes = await User.findById({ _id });
        if (!userRes) return res.status(409).send('No record found, please check the id');
        const { _id: userId, username, email, createdAt, isAdmin, course } = userRes?._doc;
        const payload = { userId, username, email, createdAt, isAdmin, course, msg: "Fetched Successfulyy" };
        return res.status(200).json(payload);
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}