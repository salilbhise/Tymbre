const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true},
  address: {type: String, },
  city: {type: String},
  country: {type: String}, 
  zipCode: {type: String},
  about: { type: String },
  followedArtistIds: {type: Array}
});

const User = mongoose.model("User", userSchema);

module.exports = User;

