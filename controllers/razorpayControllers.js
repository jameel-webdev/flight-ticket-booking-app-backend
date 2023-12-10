import crypto from "crypto";
import User from "../models/userModel.js";
import Flight from "../models/flightModel.js";
import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";

// Send KEY
export const getRazorKey = asyncHandler(async (rreq, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEYID });
});
// Order
export const razorpayOrder = asyncHandler(async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  const options = req.body;
  const order = await instance.orders.create(options);

  if (!order) {
    res.status(500);
    throw new Error(`Server Error`);
  }

  res.status(200).json({ order, message: `Order Created Successful` });
});

// Validation
export const razorpayValidation = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const userId = req.query.userId;
  const flightId = req.query.flightId;
  const seatsBooked = req.query.seatsBooked;
  let seatsArray = seatsBooked.split(",").map(Number);
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
    transcationId: razorpay_payment_id,
    flight: flightId,
    user: userId,
    seatsBooked: seatsArray,
  });

  const savedBooking = await newBooking.save();
  // Update the flight's seatsBooked array
  flight.seatsBooked = [...flight.seatsBooked, ...seatsArray];
  await flight.save();
  // Update the user's mybookings array
  user.mybookings = [
    ...user.mybookings,
    { ...flightData, ...savedBooking._doc },
  ];
  await user.save();
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    res.status(400).json({ message: `Trancastion Failed` });
  } else {
    res.redirect(
      `${process.env.FRONTEND_URL}paymentsuccess?reference=${razorpay_payment_id}&userId=${userId}&seatsBooked=${seatsArray}`
    );
  }
});
