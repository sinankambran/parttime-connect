import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find({}).populate({
      path: "company",
      options: { sort: { createdAt: -1 } }, // Sort company data by createdAt in descending order
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while fetching jobs.",
      success: false,
    });
  }
};

export const deletejob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully.",
      success: true,
    });
  } catch {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updates = req.body;

    // Validate jobId
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    // Validate update payload
    if (!Object.keys(updates).length) {
      return res.status(400).json({
        message: "No updates provided.",
        success: false,
      });
    }

    // Update the job
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $set: updates }, // Only update specified fields
      { new: true, runValidators: true } // Return the updated document
    );

    // Handle case when job is not found
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Respond with the updated job
    return res.status(200).json({
      message: "Job updated successfully.",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      message: "Internal Server Error.",
      success: false,
      error: error.message,
    });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const adminId = req.id;
    // Fetch all jobs from the database
    const jobs = await Job.find({created_by: adminId }).populate({
      path: "company",
      options: { sort: { createdAt: -1 } }, // Sort company data by createdAt in descending order
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while fetching jobs.",
      success: false,
    });
  }
}
