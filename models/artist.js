const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  about: { type: String },
  spotifyView: { type: Date, default: Date.now }
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;

