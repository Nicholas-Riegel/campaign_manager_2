//models/campaign.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    player: { type: String, required: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
    pronoun: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
});

const PlayerSchema = new Schema({
    isGM: { type: Boolean, required: true },
    characters: [CharacterSchema],
});

const PlaceSchema = new Schema({
    name: { type: String, required: true },
    charactersPresent: [{ roll: { type: Number, required: true } }],
    type: { type: String, required: true },
});

const CampaignSchema = new Schema({
    name: { type: String, required: true },
    system: { type: String, required: true },
    players: [PlayerSchema],
    places: [PlaceSchema],
});

module.exports = mongoose.model("campaign", CampaignSchema);
