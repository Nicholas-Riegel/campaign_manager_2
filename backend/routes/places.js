const express = require("express");
const router = express.Router();
const Place = require("../models/place");

// GET all places
router.get("/", async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new place
router.post("/", async (req, res) => {
    const place = new Place(req.body);
    try {
        const newPlace = await place.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a place
router.put("/:id", async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        Object.assign(place, req.body);
        const updatedPlace = await place.save();
        res.json(updatedPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a place
router.delete("/:id", async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        await place.remove();
        res.json({ message: "Place deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
