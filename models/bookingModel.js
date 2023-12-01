import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    flight: {
      type: mongoose.Schema.ObjectId,
      ref: "flights",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    seats: {
      type: Array,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("bookings", bookingSchema);
