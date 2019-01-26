const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  about: { type: String },
  spotifyView: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

