// src/controllers/campaignController.js
const Campaign = require("../models/Campaign");
const Character = require("../models/Character");

// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        // Find all campaigns without populating related characters
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (err) {
        // Log error and send server error response if there's an issue
        console.error("Error getting campaigns:", err);
        res.status(500).send("Server Error");
    }
};

// Create a campaign
exports.createCampaign = async (req, res) => {
    const { campaignName, campaignSystem, campaignCharacters } = req.body;
    try {
        // Create a new campaign with the provided name, system, and characters
        const newCampaign = new Campaign({ campaignName, campaignSystem, campaignCharacters });
        const campaign = await newCampaign.save();
        // Send the created campaign as a response
        res.json(campaign);
    } catch (err) {
        // Send server error response if there's an issue
        console.error("Error creating campaign:", err);
        res.status(500).send("Server Error");
    }
};

// Update a campaign
exports.updateCampaign = async (req, res) => {
    const { campaignName, campaignSystem, campaignCharacters } = req.body;
    try {
        // Find the campaign by its ID
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign)
            return res.status(404).json({ msg: "Campaign not found" });

        // Update campaign fields if new values are provided
        campaign.campaignName = campaignName || campaign.campaignName;
        campaign.campaignSystem = campaignSystem || campaign.campaignSystem;
        if (campaignCharacters)
            campaign.campaignCharacters = campaignCharacters;

        // Save the updated campaign
        await campaign.save();
        res.json(campaign);
    } catch (err) {
        // Send server error response if there's an issue
        console.error("Error updating campaign:", err);
        res.status(500).send("Server Error");
    }
};

// Delete a campaign
exports.deleteCampaign = async (req, res) => {
    try {
        // Find the campaign by its ID
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign)
            return res.status(404).json({ msg: "Campaign not found" });

        // Delete the campaign
        await campaign.deleteOne();
        res.json({ msg: "Campaign removed" });
    } catch (err) {
        // Log error and send server error response if there's an issue
        console.error("Error deleting campaign:", err);
        res.status(500).send("Server Error");
    }
};

// Get a single campaign by ID
exports.getCampaignById = async (req, res) => {
    try {
        // Find the campaign by its ID without populating related characters
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }
        res.json(campaign);
    } catch (err) {
        // Log error and send server error response if there's an issue
        console.error("Error getting campaign by ID:", err);
        res.status(500).send("Server Error");
    }
};
