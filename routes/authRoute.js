import express from 'express';
const router = express.Router();
import {  postLogin } from '../controller/auth/postLogin.js';
import { postRegister } from '../controller/auth/postRegister.js';

const authRoute = () => {
router.post('/login',postLogin)
router.post('/register', postRegister)
}

export default authRoute;