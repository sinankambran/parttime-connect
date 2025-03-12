import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createResume);
router.route("/get").get(isAuthenticated, getUserResumes);
router.route("/get/:id").get(isAuthenticated, getResumeById);
router.route("/update/:id").put(isAuthenticated, updateResume);
router.route("/delete/:id").delete(isAuthenticated, deleteResume);

export default router;
