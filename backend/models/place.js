const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  charactersPresent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'character' }],
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'campaign' }
});

module.exports = mongoose.model('place', placeSchema);
