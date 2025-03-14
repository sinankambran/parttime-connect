import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {getChatbotResponse} from "../controllers/chatbot.controller.js";
 
const router = express.Router();

router.route("/chat").post(isAuthenticated,getChatbotResponse);

 

export default router;
