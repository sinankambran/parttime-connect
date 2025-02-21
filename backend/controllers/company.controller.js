import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company.",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompany = async (req, res) => {
  try {

    const companies = await Company.find({});
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while fetching companies.",
      success: false,
    });
  }
};
// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // Validate required fields
    if (!name || !description || !website || !location) {
      return res.status(400).json({
        message:
          "All fields (name, description, website, location) are required.",
        success: false,
      });
    }

    // Prepare update data
    const updateData = { name, description, website, location };

    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(
          fileUri.content,
          {
            folder: "company_logos", // Optional: organize uploads by folder
          }
        );
        updateData.logo = cloudResponse.secure_url; // Save the uploaded logo URL
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({
          message: "Failed to upload logo. Please try again.",
          success: false,
        });
      }
    }

    // Update the company
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied on updates
    });

    // Check if the company exists
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // Respond with the updated company
    return res.status(200).json({
      message: "Company information updated successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      message: "An error occurred while updating company information.",
      success: false,
      error: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find and delete the company
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getRecruiterCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    console.log("user id is ${userId}");
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while fetching companies.",
      success: false,
    });
  }

}