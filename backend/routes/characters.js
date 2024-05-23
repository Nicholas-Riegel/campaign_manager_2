const express = require("express");
const router = express.Router();
const Character = require("../models/character");

// GET all characters
router.get("/", async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new character
router.post("/", async (req, res) => {
    const character = new Character(req.body);
    try {
        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a character
router.put("/:id", async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        }
        Object.assign(character, req.body);
        const updatedCharacter = await character.save();
        res.json(updatedCharacter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a character
router.delete("/:id", async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        }
        await character.remove();
        res.json({ message: "Character deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
