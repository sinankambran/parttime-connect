
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany,deleteCompany,getRecruiterCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/getrecruitercompany").post(isAuthenticated,getRecruiterCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
// router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);


export default router;
