import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";

// Get All Bookings
export const getAllBookings = asyncHandler(async (req, res) => {
  const allBookings = await Booking.find();
  if (allBookings) {
    res.status(200).json({
      data: allBookings,
      message: `All Bookings Data Fetched`,
    });
  } else {
    res.status(400);
    throw new Error(`Failed to Get Flights Data`);
  }
});

// Get Booking ById
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.userId);
  if (booking) {
    res.status(200).json({
      booking,
      message: `Booking Data Retrived`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid Booking Details`);
  }
});

// Cancel Bookings
export const cancelBookingById = asyncHandler(async (req, res) => {});
