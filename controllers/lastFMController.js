require('dotenv').config();
const keys = require('../keys/lastFMKeys.js');
const axios = require("axios");

module.exports = {
  // Searches for a LastFM Artist
  lastFMSearch: function (req, res) {
    console.log(req.params.artist);
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${req.params.artist}&api_key=${keys.lastFM.api_key}&format=json`).then(lastFMData => {
      //console.log(lastFMData.data);
      res.send(lastFMData.data);
    });
  }
};
