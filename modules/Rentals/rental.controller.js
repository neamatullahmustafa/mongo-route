import { ObjectId } from "mongodb";
import {db} from "../../database/databaseConnection.js"; 


export const createRental = async (req, res) => {
  try {
    const { customerId, carId, rentalDate, returnDate, price } = req.body;

    
    if (!customerId || !carId || !rentalDate || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    
    const rental = await db.collection("rentals").insertOne({
      customerId: new ObjectId(customerId),
      carId: new ObjectId(carId),
      rentalDate: new Date(rentalDate),
      returnDate: returnDate ? new Date(returnDate) : null,
      price,
    });

    res.status(201).json({ message: "Rental created successfully", rentalId: rental.insertedId });
  } catch (error) {
    console.error("Create rental error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateRental = async (req, res) => {
  try {
    const { id } = req.params;
    const { returnDate, price } = req.body;

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid rental ID" });
    }

    
    const result = await db.collection("rentals").updateOne(
      { _id: new ObjectId(id) },
      { $set: { returnDate: returnDate ? new Date(returnDate) : null, price } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json({ message: "Rental updated successfully" });
  } catch (error) {
    console.error("Update rental error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteRental = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid rental ID" });
    }

    
    const result = await db.collection("rentals").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json({ message: "Rental deleted successfully" });
  } catch (error) {
    console.error("Delete rental error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllRentals = async (req, res) => {
  try {
    
    const rentals = await db.collection("rentals").find().toArray();

    res.status(200).json(rentals);
  } catch (error) {
    console.error("Get all rentals error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getRental = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid rental ID" });
    }

    
    const rental = await db.collection("rentals").findOne({ _id: new ObjectId(id) });

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json(rental);
  } catch (error) {
    console.error("Get rental error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
