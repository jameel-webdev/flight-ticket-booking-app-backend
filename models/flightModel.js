import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightName: {
    type: String,
    required: true,
  },
  flightCode: {
    type: String,
    required: true,
    unique: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  flightType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seatsBooked: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("flights", flightSchema);
