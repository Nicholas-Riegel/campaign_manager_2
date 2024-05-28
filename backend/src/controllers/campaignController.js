// src/controllers/campaignController.js
const Campaign = require("../models/Campaign");
const Character = require("../models/Character");

// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate("campaignCharacters");
        res.json(campaigns);
    } catch (err) {
        console.error("Error getting campaigns:", err); // Log the error
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
    const { campaignName, campaignSystem, campaignCharacters } = req.body;
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign)
            return res.status(404).json({ msg: "Campaign not found" });

        campaign.campaignName = campaignName || campaign.campaignName;
        campaign.campaignSystem = campaignSystem || campaign.campaignSystem;
        if (campaignCharacters)
            campaign.campaignCharacters = campaignCharacters;

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

        await campaign.deleteOne();
        res.json({ msg: "Campaign removed" });
    } catch (err) {
        console.error("Error deleting campaign:", err);
        res.status(500).send("Server Error");
    }
};

// Get a single campaign by ID
exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id).populate(
            "campaignCharacters"
        );
        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }
        res.json(campaign);
    } catch (err) {
        console.error("Error getting campaign by ID:", err);
        res.status(500).send("Server Error");
    }
};
