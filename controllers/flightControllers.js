import User from "../models/userModel.js";
import Flight from "../models/flightModel.js";
import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";

// AddFlight
export const addFlight = asyncHandler(async (req, res) => {
  const {
    flightName,
    flightCode,
    origin,
    destination,
    journeyDate,
    departureTime,
    arrivalTime,
    capacity,
    flightType,
    price,
    status,
  } = req.body;
  // Input Check
  if (
    !flightName ||
    !flightCode ||
    !origin ||
    !destination ||
    !journeyDate ||
    !departureTime ||
    !arrivalTime ||
    !capacity ||
    !flightType ||
    !price
  )
    throw new Error(`Please Provide All Flight Details`);

  // Existing Check
  const existingFlight = await Flight.findOne({ flightCode });
  if (existingFlight) throw new Error(`Flight-Code Already Exists`);

  // Adding Flight
  const newFlight = await Flight.create({
    flightName,
    flightCode,
    origin,
    destination,
    journeyDate,
    departureTime,
    arrivalTime,
    capacity,
    flightType,
    price,
    status,
  });
  if (newFlight) {
    res.status(201).json({
      _id: newFlight._id,
      flightName: newFlight.flightName,
      flightCode: newFlight.flightCode,
      flightType: newFlight.flightType,
      price: newFlight.price,
      status: newFlight.status,
      message: `New Flight Added Successfully`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid Flight Data`);
  }
});

// All Flights
export const getAllFlights = asyncHandler(async (req, res) => {
  const allFlights = await Flight.find({});
  if (allFlights) {
    res.status(200).json({
      allFlights,
      message: `All Flights Data Fetched`,
    });
  } else {
    res.status(400);
    throw new Error(`Failed to Get Flights Data`);
  }
});

// Get Flight By ID
export const getFlight = asyncHandler(async (req, res) => {
  const { flightId } = req.params;
  // check flightId
  const flight = await Flight.findById(flightId);
  if (flight) {
    res.status(200).json({
      flight,
      message: `Flight Data Retrived`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid Flight Data`);
  }
});

// Update Flight Data
export const updateFlight = asyncHandler(async (req, res) => {
  const { flightId } = req.params;
  const { ...newData } = req.body;
  // check flightId
  const flight = await Flight.findById(flightId);
  if (flight) {
    const newflightData = await Flight.findByIdAndUpdate(
      flightId,
      { $set: newData },
      { new: true }
    );
    console.log(newflightData);
    res.status(200).json({
      newflightData,
      message: `Flight Details Updated`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid Flight Data`);
  }
});
