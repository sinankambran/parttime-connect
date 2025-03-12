
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob,deletejob,updateJob,getRecruiterJobs } from "../controllers/job.controller.js";
import { singleUpload } from "../middlewares/mutler.js";
const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/getrecruiterjobs").get(isAuthenticated,getRecruiterJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateJob);
router.route("/delete/:id").delete(isAuthenticated,deletejob)

export default router;
