import express from "express";
import {
  getRazorKey,
  razorpayOrder,
  razorpayValidation,
} from "../controllers/razorpayControllers.js";
import { protect } from "../middlewares/protectMiddleware.js";
const router = express.Router();

// Get Key
router.route("/getkey").get(protect, getRazorKey);
// Create Order
router.route("/order").post(razorpayOrder);
// Validate Order Signature
router.route("/validate").post(razorpayValidation);

export default router;
