// src/routes/characterRoutes.js
const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

router.get("/", characterController.getCharacters);
router.post("/", characterController.createCharacter);
router.put("/:id", characterController.updateCharacter);
router.delete("/:id", characterController.deleteCharacter);

module.exports = router;
