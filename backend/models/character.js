const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  player: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  pronoun: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'place' }],
  campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'campaign' }]
});

module.exports = mongoose.model('character', characterSchema);
