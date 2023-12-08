import User from "../models/userModel.js";
import Flight from "../models/flightModel.js";
import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";

// New Booking
export const newBooking = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { flightId, seatsBooked } = req.body;
  // Input check
  if (
    !userId ||
    !flightId ||
    !Array.isArray(seatsBooked) ||
    seatsBooked.length === 0
  )
    throw new Error(`Request to Provide Needed Data`);

  // Check if user and flight exist
  const user = await User.findById(userId);
  const flight = await Flight.findById(flightId);
  if (!user || !flight) throw new Error(`User or flight not found`);
  const flightData = {
    flightName: flight.flightName,
    flightCode: flight.flightCode,
    journeyDate: flight.journeyDate,
  };
  // Create a new booking
  const newBooking = new Booking({
    user: userId,
    flight: flightId,
    seatsBooked: seatsBooked,
  });

  const savedBooking = await newBooking.save();
  // Update the flight's seatsBooked array
  flight.seatsBooked = [...flight.seatsBooked, ...req.body.seatsBooked];
  await flight.save();
  // Update the user's mybookings array
  user.mybookings = [
    ...user.mybookings,
    { ...flightData, ...savedBooking._doc },
  ];
  await user.save();
  if (savedBooking) {
    res.status(201).json({
      userData: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        mybookings: user.mybookings,
      },
      savedBooking,
      message: `Ticket Booked`,
    });
  } else {
    res.status(400);
    throw new Error(`Booking Failed`);
  }
});

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
