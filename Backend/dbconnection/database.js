const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Use environment variables for sensitive information
const dbURI = process.env.MONGO_URI;

// Log the database URI (for debugging purposes, but be cautious with sensitive information)
console.log("Connecting to MongoDB...");

mongoose
  .connect(dbURI, {
    useNewUrlParser: true, // Use the new MongoDB driver's URL string parser
    useUnifiedTopology: true, // Use the new MongoDB driver's topology engine
    useCreateIndex: true, // Automatically use createIndex() instead of ensureIndex()
    useFindAndModify: false, // Use native findOneAndUpdate() rather than findAndModify()
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
