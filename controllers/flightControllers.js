import Flight from "../models/flightModel.js";
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
    !price ||
    !status
  )
    throw new Error(`Please Provide All Flight Details`);

  // Existing Check
  const existingFlight = await Flight.findOne({ flightCode });
  if (existingFlight) throw new Error(`Flight-Code Already Exists`);

  // Adding Flight
  const newFlight = await Flight.create({ ...req.body });
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
  const filteredKeyword = Object.fromEntries(
    Object.entries({ ...req.query }).filter(([_, value]) => value !== "")
  );
  const allFlights = await Flight.find(filteredKeyword);
  if (allFlights.length > 0) {
    res.status(200).json({
      data: allFlights,
      message: `All Flights Data Fetched`,
    });
  } else {
    res.status(400);
    throw new Error(`Failed to Get Flights Data`);
  }
});

// Get Flight By ID
export const getFlightById = asyncHandler(async (req, res) => {
  // check flightId
  const flight = await Flight.findById(req.params.flightId);
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
export const updateFlightById = asyncHandler(async (req, res) => {
  // check flightId
  const flight = await Flight.findById(req.params.flightId);
  if (flight) {
    const newflightData = await Flight.findByIdAndUpdate(
      req.params.flightId,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      newflightData,
      message: `Flight Details Updated`,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid Flight Data`);
  }
});
