const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    charactersPresent: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign' }
});

module.exports = mongoose.model("Place", PlaceSchema);
