import express from "express";
import {
  createRental,
  updateRental,
  deleteRental,
  getAllRentals,
  getRental,
} from "./rental.controller.js";

const rentalRouter = express.Router();

rentalRouter.post("/", createRental);
rentalRouter.put("/:id", updateRental);
rentalRouter.delete("/:id", deleteRental);
rentalRouter.get("/", getAllRentals);
rentalRouter.get("/:id", getRental);

export default rentalRouter;
