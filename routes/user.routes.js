import express from 'express';
import { registerUser } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', registerUser); // 2 chije leni hoti h ek to path and ek to callback function

export default router;