import express from "express";
import {
  getAllBookings,
  newBooking,
  getBookingById,
  cancelBookingById,
} from "../controllers/bookingControllers.js";
import { adminProtect, protect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// New Bookings
router.route("/newbooking").post(protect, newBooking);

// All Bookings
router.route("/getallbookings").get(adminProtect, getAllBookings);

// Get Booking ById
router.route("/:bookingId").get(protect, getBookingById);

// Cancel Booking ById
router.route("/:bookingId").delete(protect, cancelBookingById);

export default router;
