import { ObjectId } from "mongodb";
import { db } from "../../database/databaseConnection.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET =  "123";


export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const existingCustomer = await db.collection("customers").findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const result = await db.collection("customers").insertOne({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({ message: "Signup successful", customer: result });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const customer = await db.collection("customers").findOne({ email });
    if (!customer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = jwt.sign({ userId: customer._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Sign in successful", token });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    
    const customer = await db.collection("customers").findOne({ _id: new ObjectId(id) },{ projection: { password: 0 } } );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    
    const customers = await db.collection("customers").find(     {}, 
      { projection: { password: 0 } } ).toArray();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Get all customers error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (id !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to update this customer" });
    }

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const updateData = req.body;

    
    if (updateData.password) {
      return res.status(400).json({ message: "Cannot update password directly" });
    }

    
    const result = await db.collection("customers").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Update customer error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (id !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to delete this customer" });
    }

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    
    const result = await db.collection("customers").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
