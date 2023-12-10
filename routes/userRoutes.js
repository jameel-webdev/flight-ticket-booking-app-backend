import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/protectMiddleware.js";
const router = express.Router();

// Registration /api/users/signup
router.route("/signup").post(registerUser);

// Login /api/users/signin
router.route("/signin").post(loginUser);

// Logout /api/users/logout
router.route("/logout").post(logoutUser);

//Get profile
router.route("/profile").get(protect, getUserProfile);

// Update User Data
router.route("/profile").put(protect, updateUserProfile);

// Get All Users
router.route("/allusers").get(getAllUsers);

export default router;
