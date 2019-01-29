const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/tymbre"
);

const artistSeed = [
  {
    name: "Superman",
    genre: "Super Hero",
    about: "Good Guy",
    spotifyView: 100,
    lastFmListeners: 200,
    totalViewsAndListeners: 350,
    imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/SupermanRoss.png/250px-SupermanRoss.png"
  },
  {
    name: "Dr. Doom",
    genre: "Super Villain",
    about: "Mystical Powers",
    spotifyView: 500,
    lastFmListeners: 5,
    totalViewsAndListeners: 505,
    imageLink: "https://assets1.ignimgs.com/2018/04/23/latest-br-1524507422458_1280w.jpg"
  },
  {
    name: "Batman",
    genre: "Super Hero",
    about: "Lives in the bat cave",
    spotifyView: 44,
    lastFmListeners: 7,
    totalViewsAndListeners: 51,
    imageLink: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Batman-BenAffleck.jpg/200px-Batman-BenAffleck.jpg"
  }
];

db.Artist
  .remove({})
  .then(() => db.Artist.collection.insertMany(artistSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
