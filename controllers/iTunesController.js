const axios = require("axios");

module.exports = {
  iTunesSearch: function (req, res) {
    axios.get(`https://itunes.apple.com/search?term=${req.params.artist}&limit=10`).then(iTunesResponse => {
      axios.get(`https://itunes.apple.com/lookup?id=${iTunesResponse.data.results[0].artistId}`).then(iTunesArtistResponse => {
        res.send(iTunesArtistResponse.data);
      })
    })
  },
  iTunesTrackInformationSearch: function (req, res) {
    axios.get(`https://itunes.apple.com/search?term=${req.params.artist}&limit=10`).then(iTunesResponse => {
      res.send(iTunesResponse.data.results);
    })
  }
}