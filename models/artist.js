const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  about: { type: String },
  spotifyFollowers: { type: Number, },
  lastFMListeners: { type: Number, },
  totalFollowersAndListeners: { type: Number, },
  imageLink: { type: String, },
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;

