const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    name: { type: String, required: true },
    system: { type: String, required: true },
    places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
});

module.exports = mongoose.model("Campaign", CampaignSchema);
