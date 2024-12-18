import express from "express";
import {
  getCarsByModels,
  getAvailableCarsByModel,
  getCarsByRentalStatusOrModel,
  getAvailableOrRentedCars,
} from "./special.controller.js";

const specialRouter = express.Router();

specialRouter.get("/cars-by-models", getCarsByModels);
specialRouter.get("/available-cars", getAvailableCarsByModel);
specialRouter.get("/cars-by-rental-or-model", getCarsByRentalStatusOrModel);
specialRouter.get("/available-or-rented-cars", getAvailableOrRentedCars);

export default specialRouter;
