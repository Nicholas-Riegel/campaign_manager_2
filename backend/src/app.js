// src/app.js
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Middleware to handle CORS and JSON requests
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes for campaigns and characters
app.use("/api/campaigns", require("./routes/campaignRoutes"));
app.use("/api/characters", require("./routes/characterRoutes"));

// Export the app to be used in the server setup
module.exports = app;
