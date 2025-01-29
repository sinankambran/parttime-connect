import { Resume } from "../models/resume.model.js";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    
    const savedResume = await resume.save();
    res.status(201).json({
      message: "Resume created successfully",
      success: true,
      data: savedResume,
    });
  } catch (error) {
    console.error("Error creating resume:", error.message);
    res.status(500).json({ error: "Failed to create resume" });
  }
};


// Get all resumes for a specific user by email
export const getUserResumes = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const resumes = await Resume.find({ userEmail: email });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error.message);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

// Get a resume by ID
export const getResumeById = async (req, res) => {
  const { id } = req.params;
  console.log({id});

  try {
    const resume = await Resume.findOne({ resumeId: id });
    console.log(resume);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch resume" });
  }
};

// Update a resume
export const updateResume = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedResume = await Resume.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error.message);
    res.status(500).json({ error: "Failed to update resume" });
  }
};

// Delete a resume
export const deleteResume = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedResume = await Resume.findByIdAndDelete(id);
    if (!deletedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error.message);
    res.status(500).json({ error: "Failed to delete resume" });
  }
};
