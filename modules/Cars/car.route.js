import express from "express";
import {
  addCar,
  getCar,
  getAllCars,
  updateCar,
  deleteCar,
} from "./car.controller.js";

const carRouter = express.Router();

carRouter.post("/", addCar);
carRouter.get("/:id", getCar);
carRouter.get("/", getAllCars);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;
