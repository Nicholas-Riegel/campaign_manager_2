//src/models/Campaign.js
const mongoose = require('mongoose');

// Define the schema for the Campaign model
const CampaignSchema = new mongoose.Schema({
    // Name of the campaign, required field
    campaignName: { type: String, required: true },
    // System used for the campaign, required field
    campaignSystem: { type: String, required: true },
    // List of characters associated with the campaign, referencing the Character model
    campaignCharacters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
});

// Export the Campaign model based on the CampaignSchema
module.exports = mongoose.model("Campaign", CampaignSchema);
