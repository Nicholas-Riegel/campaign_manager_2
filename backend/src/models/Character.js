//src/models/Character.js
const mongoose = require("mongoose");

// Define the schema for the Character model
const CharacterSchema = new mongoose.Schema({
    // Name of the character, required field
    characterName: { type: String, required: true },
    // Class of the character, required field
    characterClass: { type: String, required: true },
    // Race of the character, required field
    characterRace: { type: String, required: true },
    // Campaign associated with the character, referencing the Campaign model
    characterCampaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        default: null,
    },
});

// Export the Character model based on the CharacterSchema
module.exports = mongoose.model("Character", CharacterSchema);
