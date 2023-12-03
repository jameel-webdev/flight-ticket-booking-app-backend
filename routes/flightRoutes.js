import express from "express";
import {
  addFlight,
  getAllFlights,
  getFlight,
  updateFlight,
} from "../controllers/flightControllers.js";
import { adminProtect, protect } from "../middlewares/protectMiddleware.js";

const router = express.Router();

// Create Flight Data
router.route("/addflight").post(adminProtect, addFlight);
// Get All Flights Data
router.route("/").get(protect, getAllFlights);
// Update Flight
router
  .route("/:flightId")
  .get(protect, getFlight)
  .put(adminProtect, updateFlight);
export default router;
