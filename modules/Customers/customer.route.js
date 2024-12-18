import express from "express";
import {
  signup,
  signIn,
  getCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "./customer.controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const customerRouter = express.Router();

customerRouter.post("/signup", signup);
customerRouter.post("/signIn", signIn);
customerRouter.get("/:id", getCustomer);
customerRouter.get("/", getAllCustomers);
customerRouter.put("/:id", authenticateToken, updateCustomer);
customerRouter.delete("/:id", authenticateToken, deleteCustomer);

export default customerRouter;
