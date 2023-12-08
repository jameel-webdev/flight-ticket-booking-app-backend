import express from "express";
import {
  addFlight,
  getAllFlights,
  getFlightById,
  updateFlightById,
} from "../controllers/flightControllers.js";
import { adminProtect, protect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// Create Flight Data
router.route("/addflight").post(adminProtect, addFlight);
// Get All Flights Data
router.route("/getflights").get(protect, getAllFlights);
// Get Flight By Id
router.route("/:flightId").get(protect, getFlightById);
// Update Flight By Id
router.route("/:flightId").put(adminProtect, updateFlightById);
export default router;
