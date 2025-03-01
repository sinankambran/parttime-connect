import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    // console.log(companyName);
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
    console.log(company);
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

    const file = req.file;
    // idhar cloudinary ayega
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find and delete the company
    const company = await Company.findByIdAndDelete(companyId);
    console.log(company);

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
    const userId = req.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: true });
    }

    console.log(`Fetching companies for recruiter: ${userId}`);

    const companies = await Company.find({ userId });

    console.log(companies, userId);

    if (!companies.length == 1) {
      return res.status(404).json({
        message: "No companies found for this recruiter.",
        success: false,
      });
    }

    return res.status(200).json({ company: companies[0], success: true });
  } catch (error) {
    console.error("Error fetching recruiter companies:", error);
    return res.status(500).json({
      message: "An error occurred while fetching companies.",
      success: false,
    });
  }
};
