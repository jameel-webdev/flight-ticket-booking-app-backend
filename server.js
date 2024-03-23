/* Importing Packages */
import express from "express";
import path from "path";
const __dirname = path.resolve();
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import razorpayRoutes from "./routes/razorpayRoutes.js";
import { errorHandler } from "./middlewares/errorMiddlewares.js";
import generateFlightData from "./utils/generateRandomData.js";
// Assigning PORT
const port = process.env.PORT || 7000;

/* Connecting Database */
import connectDatabase from "./config/db.js";
connectDatabase();

/* Initialing Express */
const app = express();

/* Built-in-Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
/* 3rd-party-Middlewares */
app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/razorpay", razorpayRoutes);

/* API_Html_Pages */
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, "public", "html", "index.html"));
    app.get("*", (req, res) => {
      res.status(404);
      res.sendFile(path.join(__dirname, "public", "html", "404.html"));
    });
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Flight-Ticket-Booking-App Server Page" });
  });
  app.get("*", (req, res) => {
    res.json({ message: "Sorry! Resources Not Found" });
  });
}

/* Error-Handlers || Custom Middlewares */
app.use(errorHandler);

// Call generateFlightData when the server starts
async function startServer() {
  try {
    // Call the function with the desired count
    await generateFlightData();
    /* Server Listening */
    app.listen(port, () => {
      console.log(`Server Running On Port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
}

// Call startServer to initiate the server startup
startServer();
