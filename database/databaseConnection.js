import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "momgozTask";

client
  .connect()
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch((err) => {
    console.error("An error occurred connecting to MongoDB: ", err);
  });
export const db = client.db(dbName);
