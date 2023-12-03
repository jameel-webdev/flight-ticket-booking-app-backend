import express from "express";
import {
  allBookings,
  getBooking,
  newBooking,
  updateBooking,
} from "../controllers/bookingControllers.js";
import { adminProtect, protect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// New Bookings
router.route("/newbooking").post(protect, newBooking);

// All Bookings
router.route("/").get(adminProtect, allBookings);

// Update Booking
router
  .route("/:bookingId")
  .get(protect, getBooking)
  .put(protect, updateBooking);

export default router;
