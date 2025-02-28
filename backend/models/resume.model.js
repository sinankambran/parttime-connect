import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    title: { type: String },
    resumeId: { type: String, unique: true },
    userEmail: { type: String },
    userName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    address: { type: String },
    jobTitle: { type: String },
    phone: { type: String },
    summery: { type: String },
    title: { type: String },
    companyName: { type: String },
    city: { type: String },
    state: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    workSummery: { type: String },
    universityName: { type: String },
    degree: { type: String },
    major: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
    name: { type: String },
    rating: { type: String },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

export const Resume = mongoose.model("Resume", ResumeSchema);
