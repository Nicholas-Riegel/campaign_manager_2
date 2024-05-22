//routes/routes.js
const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign.js");

// @route   GET api/campaigns
// @desc    Get All Campaigns
// @access  Public
router.get("/", async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ date: -1 });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
});

// @route   POST api/campaigns
// @desc    Create A Campaign
// @access  Public
router.post("/", async (req, res) => {
    const { name, system, players, places } = req.body;

    if (!name || !system) {
        return res.status(400).json({ error: "Name and system are required" });
    }

    try {
        const newCampaign = new Campaign({ name, system, players, places });
        const campaign = await newCampaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: "Failed to create campaign" });
    }
});

module.exports = router;
