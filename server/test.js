import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  console.log("✅ Connected successfully");
  await client.close();
} catch (err) {
  console.error(err);
}
