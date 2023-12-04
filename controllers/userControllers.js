import User from "../models/userModel.js";
import Flight from "../models/flightModel.js";
import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";
import {
  compareHashPassword,
  generateHashedPassword,
} from "../utils/generateHashedPassword.js";
import { generateToken } from "../utils/generateToken.js";

// Registration
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Check Inputs
  if (!name || !email || !password) throw new Error(`Provide All User Details`);

  // Check Exicting User
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error(`User Already Exists`);

  // Register New User
  const hashedPassword = await generateHashedPassword(password);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      message: `Registration Successfull`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid User Data`);
  }
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check Inputs
  if (!email || !password) throw new Error(`Provide Valid User Details`);

  // User Data Check
  const validUser = await User.findOne({ email });
  if (!validUser) throw new Error(`Invalid User Details`);
  const validPassword = await compareHashPassword(password, validUser.password);
  if (validUser && validPassword) {
    generateToken(res, validUser._id);
    res.status(200).json({
      _id: validUser._id,
      name: validUser.name,
      email: validUser.email,
      isAdmin: validUser.isAdmin,
      message: `Login Successfull`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid User Details`);
  }
});

// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: `User Logged Out ☹️` });
});

// Get User Data
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json({ user });
});

// Update User Data
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // Check User
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Updating Details
    if (req.body.password) {
      user.password = await generateHashedPassword(req.body.password);
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      message: "User Profile Updated",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
