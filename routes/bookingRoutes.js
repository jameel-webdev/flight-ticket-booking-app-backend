import express from "express";
import {
  getAllBookings,
  getBookingById,
  cancelBookingById,
} from "../controllers/bookingControllers.js";
import { adminProtect, protect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// All Bookings
router.route("/getallbookings").get(adminProtect, getAllBookings);

// Get Booking ById
router.route("/:bookingId").get(protect, getBookingById);

// Cancel Booking ById
router.route("/:bookingId").delete(protect, cancelBookingById);

export default router;
