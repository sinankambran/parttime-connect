import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
