import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

// Register a user  -------------------------------------------
export const registerUserContoller = asyncHandler(async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // Save user and respond
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login a user-------------------------------------------
export const loginUserContoller = asyncHandler(async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }], // Find user by username or email
    });

    // If user not found
    if (!user) {
      throw new Error("Wrong Credentials");
    }

    // Validate password
    const validate = await bcrypt.compare(req.body.password, user.password);

    // If password is wrong
    if (!validate) {
      throw new Error("Wrong Credentials");
    }

    // If login success, send user info
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});
