import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

// #UPDATE------------------------------------------------------------
export const updateUserController = async (req, res) => {
  try {
    const { userId, password, ...otherUpdates } = req.body;

    // Check if the user is updating their own account
    if (userId === req.params.id) {
      // If a new password is provided, hash it before updating
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      // Use { new: true } to return the updated document
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: otherUpdates },
        { new: true }
      );

      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "Data updated successfully", updatedUser });
    } else {
      res.status(401).json({ message: "You can only update your account" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// #DELETE------------------------------------------------------
export const deleteUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.userId !== req.params.id) {
      return res
        .status(401)
        .json({ message: "You can only delete your account" });
    }

    try {
      const userDelete = await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "User has been deleted successfully", userDelete });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding user", error });
  }
};

// #GET USER----------------------------------------------------
export const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Log user and req.params.id for debugging
    console.log("User:", user);
    console.log("User ID from params:", req.params.id);

    if (!user) {
      // Log an additional message for debugging
      console.log("User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    // Log the error for debugging
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
