// src/app.js
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use("/api/campaigns", require("./routes/campaignRoutes"));
app.use("/api/characters", require("./routes/characterRoutes"));

module.exports = app;
