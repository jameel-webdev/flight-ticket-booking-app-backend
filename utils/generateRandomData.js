import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import Flight from "../models/flightModel.js";

const locations = [
  "Ahmedabad-AMD",
  "Bangalore-BLR",
  "Chennai-MAA",
  "Delhi-DEL",
  "Goa-GOI",
  "Hyderabad-HYD",
  "Kochi-COK",
  "Kolkata-CCU",
  "Mumbai-BOM",
  "Pune-PNQ",
];
const flightType = ["Economy", "First Class", "Business Class"];
// Function to get a random index within the array length
const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

// Function to get two different random locations
const getRandomLocations = () => {
  const originIndex = getRandomIndex(locations.length);
  let destinationIndex = getRandomIndex(locations.length);

  // Make sure destination is different from origin
  while (destinationIndex === originIndex) {
    destinationIndex = getRandomIndex(locations.length);
  }

  const origin = locations[originIndex];
  const destination = locations[destinationIndex];

  return { origin, destination };
};

// Function to get a random flight class
const getRandomFlightClass = () => {
  const index = getRandomIndex(flightType.length);
  return flightType[index];
};

async function generateFlightData(count = 100) {
  try {
    await Flight.collection.drop();
    for (let i = 0; i < count; i++) {
      const { origin, destination } = getRandomLocations();
      const flightClass = getRandomFlightClass();
      const newFlight = {
        flightName: faker.airline.airline().name,
        flightCode: `${
          faker.airline.airline().iataCode
        }-${faker.airline.flightNumber({ addLeadingZeros: true })}`,
        origin,
        destination,
        journeyDate: format(
          faker.date.soon({
            days: 5,
          }),
          "yyyy-MM-dd"
        ),
        departureTime: faker.date.anytime().toTimeString().slice(0, 5),
        arrivalTime: faker.date.anytime().toTimeString().slice(0, 5),
        capacity: faker.number.int({ min: 25, max: 69 }),
        flightType: flightClass,
        price: faker.number.int({ min: 4999, max: 9999 }),
      };

      try {
        // Create each flight individually
        await Flight.create(newFlight);
      } catch (error) {
        // Handle the duplicate key error (E11000) for each flight individually
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
          console.error(
            `Duplicate key error for flightCode: ${error.keyValue.flightCode}`
          );
          // Optionally, you can skip or log the duplicate entry
        } else {
          // Handle other errors
          console.error("Error creating flight:", error.message);
        }
      }
    }
  } catch (error) {
    console.error("Error dropping collection:", error.message);
  }
}

export default generateFlightData;
