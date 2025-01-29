import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    resumeId: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);


export const Resume = mongoose.model("Resume", ResumeSchema);