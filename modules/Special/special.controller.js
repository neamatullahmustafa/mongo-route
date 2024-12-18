import { ObjectId } from "mongodb";
import {db} from "../../database/databaseConnection.js"; 


export const getCarsByModels = async (req, res) => {
  try {
    const { model } = req.query;

    if (!model) {
      return res.status(400).json({ message: "Model is required" });
    }

    const cars = await db.collection("cars").find({ model }).toArray();

    res.status(200).json(cars);
  } catch (error) {
    console.error("Get cars by model error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAvailableCarsByModel = async (req, res) => {
  try {
    const { model } = req.query;

    if (!model) {
      return res.status(400).json({ message: "Model is required" });
    }

    const cars = await db
      .collection("cars")
      .find({ model, rentalStatus: "available" })
      .toArray();

    res.status(200).json(cars);
  } catch (error) {
    console.error("Get available cars by model error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getCarsByRentalStatusOrModel = async (req, res) => {
  try {
    const { rentalStatus, model } = req.query;

    if (!rentalStatus && !model) {
      return res.status(400).json({ message: "Either rentalStatus or model is required" });
    }

    const query = {};
    if (rentalStatus) query.rentalStatus = rentalStatus;
    if (model) query.model = model;

    const cars = await db.collection("cars").find(query).toArray();

    res.status(200).json(cars);
  } catch (error) {
    console.error("Get rented or specific model cars error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAvailableOrRentedCars = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ message: "Status (available/rented) is required" });
    }

    const cars = await db.collection("cars").find({ rentalStatus: status }).toArray();

    res.status(200).json(cars);
  } catch (error) {
    console.error("Get available or rented cars error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
