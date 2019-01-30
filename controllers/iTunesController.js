const axios = require("axios");

module.exports = {
  iTunesSearch: function (req, res) {
    axios.get(`https://itunes.apple.com/search?term=${req.params.artist}&limit=10`).then(iTunesResponse => {
      console.log(iTunesResponse.data.results[0].artistId);
      //res.send(iTunesResponse.data);
      axios.get(`https://itunes.apple.com/lookup?id=${iTunesResponse.data.results[0].artistId}`).then(iTunesArtistResponse => {
        console.log(iTunesArtistResponse.data);
      })
    })
  }
}