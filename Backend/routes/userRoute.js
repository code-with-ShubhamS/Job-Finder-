// routes/auth.js
import express from 'express';
import { check } from 'express-validator';
import {login, logout, register, updateProfile} from "../controllers/userController.js"
import { isAuthenticated } from '../middleware/auth.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.post('/register',upload.single("photo"),register);

router.post('/login',login);

router.get("/logout",isAuthenticated,logout)

router.put('/profile/update',isAuthenticated ,upload.single("file"),updateProfile);

export default router;