import express from "express";
import { db } from "./database/databaseConnection.js";
import customerRouter from "./modules/Customers/customer.route.js";
import carRouter from "./modules/Cars/car.route.js";
import rentalRouter from "./modules/Rentals/rental.route.js";
import specialRouter from "./modules/Special/special.route.js";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", customerRouter);
app.use("/cars", carRouter);
app.use("/rentals", rentalRouter);
app.use("/special", specialRouter);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
