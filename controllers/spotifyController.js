require('dotenv').config();
const Spotify = require('node-spotify-api');
const keys = require('../keys/spotifyKeys.js');
const spotify = new Spotify(keys.spotify);

module.exports = {
  // Searches for a Spotify Artist
  spotifySearch: function (req, res) {
    console.log(req.params.artist);
    spotify.search({ type: "artist", query: req.params.artist }, (err, data) => {
      if (err) {
        return console.log(`Error occurred: ${err}`);
      }
      //console.log(data.artists.items[0]);
      res.json(data.artists.items[0]);
    });
  }
};
