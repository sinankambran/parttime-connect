import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
  data: {
    type: [String], // Array of Strings
    required: true,
  },
});

export const Dataset = mongoose.model("Dataset", datasetSchema,"dataset");
