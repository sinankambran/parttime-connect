import express from "express";
import { getAllUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/get-all-users").get(getAllUsers);

export default router;
