const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");
const Place = require("../models/place");
const Character = require("../models/character");

// @route   GET api/campaigns
// @desc    Get All Campaigns
// @access  Public
router.get("/", async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('places characters').sort({ date: -1 });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
});

// @route   POST api/campaigns
// @desc    Create A Campaign
// @access  Public
router.post("/", async (req, res) => {
    const { name, system, places, characters } = req.body;

    if (!name || !system) {
        return res.status(400).json({ error: "Name and system are required" });
    }

    try {
        const newCampaign = new Campaign({ name, system, places, characters });
        const campaign = await newCampaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: "Failed to create campaign" });
    }
});

// @route   POST api/places
// @desc    Create A Place
// @access  Public
router.post("/places", async (req, res) => {
    const { name, type, charactersPresent, campaign } = req.body;

    if (!name || !type) {
        return res.status(400).json({ error: "Name and type are required" });
    }

    try {
        const newPlace = new Place({ name, type, charactersPresent, campaign });
        const place = await newPlace.save();
        res.json(place);
    } catch (err) {
        res.status(500).json({ error: "Failed to create place" });
    }
});

// @route   POST api/characters
// @desc    Create A Character
// @access  Public
router.post("/characters", async (req, res) => {
    const { player, name, class: charClass, race, pronoun, level, places, campaigns } = req.body;

    if (!player || !name || !charClass || !race || !pronoun) {
        return res.status(400).json({ error: "Player, name, class, race, and pronoun are required" });
    }

    try {
        const newCharacter = new Character({ player, name, class: charClass, race, pronoun, level, places, campaigns });
        const character = await newCharacter.save();
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: "Failed to create character" });
    }
});

// @route   DELETE api/campaigns/:id
// @desc    Delete A Campaign
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }

        await campaign.remove();
        res.json({ success: true, message: "Campaign deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete campaign" });
    }
});

// @route   PUT api/campaigns/:id
// @desc    Update A Campaign
// @access  Public
router.put("/:id", async (req, res) => {
    const { name, system, places, characters } = req.body;

    if (!name || !system) {
        return res.status(400).json({ error: "Name and system are required" });
    }

    try {
        let campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }

        campaign.name = name;
        campaign.system = system;
        campaign.places = places;
        campaign.characters = characters;

        campaign = await campaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: "Failed to update campaign" });
    }
});

module.exports = router;
