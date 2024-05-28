// src/models/Campaign.js
const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
    campaignName: { type: String, required: true },
    campaignSystem: { type: String, required: true },
    campaignCharacters: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Character" },
    ],
});

module.exports = mongoose.model("Campaign", CampaignSchema);
