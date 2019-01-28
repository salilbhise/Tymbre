require('dotenv').config();
const Spotify = require('node-spotify-api');
const keys = require('../keys/keys.js');

const spotify = new Spotify(keys.spotify);

module.exports = {
  // Searches for a Spotify Artist
  spotifySearch: function(artist) {
    console.log(artist.url);
    spotify.search({type: "artist", query: artist.url}, (err, data) => {
      if (err) {
        return console.log(`Error occurred: ${err}`);
      }
    return console.log(data.artists.items[0]);
    });
  }
};
