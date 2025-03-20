import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import resumeRoute from "./routes/resume.routes.js";
import chatRoute from "./routes/chatbot.route.js";
dotenv.config({});

const app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log(process.env.VITE_CLIENT_URL);
const corsOptions = {
  origin: process.env.VITE_CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/resumes", resumeRoute);
app.use("/api/v1/chatbot", chatRoute);


//api working
app.get("/",(req,res) => {
  res.send("api working")
} )
connectDB().then(() => {
  console.log("Connnected to Mongodb Database");
  app.listen(PORT, () => {
    console.log("Server is running " + PORT);
  });
});
