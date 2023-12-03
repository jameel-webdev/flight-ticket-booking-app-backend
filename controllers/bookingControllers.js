import User from "../models/userModel.js";
import Flight from "../models/flightModel.js";
import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";

// New Booking
export const newBooking = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const flightId = req.query.flightid;
  const seatsBooked = req.body;
  console.log(seatsBooked);
  // Input check
  if (!userId || !flightId || !seatsBooked)
    throw new Error(`Request to Provide Needed Data`);

  // Check if user and flight exist
  const user = await User.findById(userId);
  const flight = await Flight.findById(flightId);
  if (!user || !flight) throw new Error(`User or flight not found`);

  // Check seats availablity
  const unavailableSeats = seatsBooked.filter((seat) =>
    flight.seatsBooked.map((entry) => entry.seat).includes(seat)
  );
  if (unavailableSeats.length > 0) {
    return res.status(400).json({ error: "Seats are already booked" });
  }

  // Create a new booking
  const newBooking = new Booking({
    user: userId,
    flight: flightId,
    seatsB,
  });

  const savedBooking = await newBooking.save();

  // Update the flight's seatsBooked array
  flight.seatsBooked = flight.seatsBooked.push({
    ...seatsBooked,
    seatNumber: seatsBooked,
  });
  await flight.save();
  if (savedBooking) {
    res.status(201).json({
      savedBooking,
      message: `Ticket Booked`,
    });
  } else {
    res.status(400);
    throw new Error(`Booking Failed`);
  }
});

// Get All Bookings
export const allBookings = asyncHandler(async (req, res) => {});

// Get Flight By ID
export const getBooking = asyncHandler(async (req, res) => {});

// Update Bookings
export const updateBooking = asyncHandler(async (req, res) => {});
