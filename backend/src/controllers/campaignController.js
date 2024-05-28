// src/controllers/campaignController.js
const Campaign = require("../models/Campaign");
const Character = require("../models/Character");

// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate("characters");
        res.json(campaigns);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Create a campaign
exports.createCampaign = async (req, res) => {
    const { campaignName, campaignSystem } = req.body;
    try {
        const newCampaign = new Campaign({ campaignName, campaignSystem });
        const campaign = await newCampaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
    const { campaignNameame, system, characters } = req.body;
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign)
            return res.status(404).json({ msg: "Campaign not found" });

        campaign.campaignName = name || campaign.campaignName;
        campaign.campaignSystem = system || campaign.campaignSystem;
        if (characters) campaign.campaignCharacters = characters;

        await campaign.save();
        res.json(campaign);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Delete a campaign
exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign)
            return res.status(404).json({ msg: "Campaign not found" });

        await campaign.remove();
        res.json({ msg: "Campaign removed" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};
