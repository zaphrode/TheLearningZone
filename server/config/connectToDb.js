// /config/connectToDb.js
const mongoose = require("mongoose");

async function connectToDb() {
  try {
    console.log("Attempting to connect to the database...");
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit on failure to avoid running with no DB connection
  }
}

module.exports = connectToDb;
