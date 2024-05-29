// src/config/database.js
const mongoose = require("mongoose");

// Function to connect to MongoDB using mongoose
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
    } catch (err) {
        // Log any error that occurs during the connection attempt
        console.error(err.message);
        // Exit the process with failure code if the connection fails
        process.exit(1);
    }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;

