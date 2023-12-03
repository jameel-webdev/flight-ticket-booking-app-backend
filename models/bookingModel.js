import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flights",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  seatsBooked: {
    type: Array,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("bookings", bookingSchema);
