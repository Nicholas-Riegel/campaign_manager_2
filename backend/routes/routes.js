const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");

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
    const { name, system, players, places } = req.body;

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
        campaign.players = players;
        campaign.places = places;

        campaign = await campaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ error: "Failed to update campaign" });
    }
});

module.exports = router;
