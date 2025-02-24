import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/companyControler.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

router.post('/register',isAuthenticated,registerCompany);

router.get('/get',isAuthenticated,getCompany);

router.get("/get/:id",isAuthenticated,getCompanyById)

router.put('/update/:id',isAuthenticated ,upload.single("logo"),updateCompany);

export default router;