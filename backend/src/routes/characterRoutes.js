// src/routes/characterRoutes.js
const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

// Define route to get all characters
router.get("/", characterController.getCharacters);

// Define route to create a new character
router.post("/", characterController.createCharacter);

// Define route to update a specific character by its ID
router.put("/:id", characterController.updateCharacter);

// Define route to delete a specific character by its ID
router.delete("/:id", characterController.deleteCharacter);

// Export the router to be used in other parts of the application
module.exports = router;
