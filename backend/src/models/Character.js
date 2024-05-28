// src/models/Character.js
const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
    characterName: { type: String, required: true },
    characterClass: { type: String, required: true },
    characterRace: { type: String, required: true },
    characterCampaigns: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
    },
});

module.exports = mongoose.model("Character", CharacterSchema);
