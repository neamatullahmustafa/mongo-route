import { ObjectId } from "mongodb";
import { db } from "../../database/databaseConnection.js"; 


export const addCar = async (req, res) => {
  try {
    const { name, model, rentalStatus = "available" } = req.body;

    if (!name || !model) {
      return res.status(400).send({ error: "Name and model are required fields." });
    }

    const newCar = { name, model, rentalStatus };
    const result = await db.collection("cars").insertOne(newCar);

    res.status(201).send(result.insertedId);
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).send({ error: "Failed to add car." });
  }
};

export const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });

    if (!car) {
      return res.status(404).send({ error: "Car not found." });
    }

    res.status(200).send(car);
  } catch (err) {
    console.error("Error retrieving car:", err);
    res.status(500).send({ error: "Failed to retrieve car." });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const cars = await db.collection("cars").find().toArray();
    res.status(200).send(cars);
  } catch (err) {
    console.error("Error retrieving cars:", err);
    res.status(500).send({ error: "Failed to retrieve cars." });
  }
};


export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await db.collection("cars").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ error: "Car not found." });
    }

    res.status(200).send({ message: "Car updated successfully." });
  } catch (err) {
    console.error("Error updating car:", err);
    res.status(500).send({ error: "Failed to update car." });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.collection("cars").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: "Car not found." });
    }

    res.status(200).send({ message: "Car deleted successfully." });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).send({ error: "Failed to delete car." });
  }
};
