import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
//added for dns error mong econnestrefuse
//import dns from "node:dns/promises";
//dns.setServers(["1.1.1.1", "1.0.0.1"]);
import dns from "node:dns";
// Temporary workaround for a local Windows DNS resolver issue affecting
// MongoDB Atlas SRV lookups during development.
// This should not be needed in production.
if (process.env.NODE_ENV === "development") {
  dns.setServers(["1.1.1.1", "1.0.0.1"]);
}
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
