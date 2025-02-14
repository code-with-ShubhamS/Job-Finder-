import express from "express"
import { isAuthenticated } from '../middleware/auth.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";
const router = express.Router()

router.post("/status/:id/update",isAuthenticated,updateStatus);
router.get("/:id/applicants",isAuthenticated,getApplicants);
router.get("/get",isAuthenticated,getAppliedJobs);
router.get("/apply/:id",isAuthenticated,applyJob);

export default router;