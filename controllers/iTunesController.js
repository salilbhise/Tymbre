const axios = require("axios");

module.exports = {
  iTunesSearch: function (req, res) {
    axios.get(`https://itunes.apple.com/search?term=${req.params.artist}&limit=10`).then(iTunesResponse => {
      //console.log(iTunesResponse.data);
      //res.send(iTunesResponse.data);
      axios.get(`https://itunes.apple.com/lookup?id=${iTunesResponse.data.results[0].artistId}`).then(iTunesArtistResponse => {
        //console.log(iTunesArtistResponse.data);
        res.send(iTunesArtistResponse.data);
      })
    })
  },
  iTunesTrackInformationSearch: function (req, res) {
    axios.get(`https://itunes.apple.com/search?term=${req.params.artist}&limit=10`).then(iTunesResponse => {
      //console.log(iTunesResponse.data);
      res.send(iTunesResponse.data.results);
      // axios.get(`https://itunes.apple.com/lookup?id=${iTunesResponse.data.results[0].artistId}&entity=album&limit=5`).then(iTunesArtistResponse => {
      //   //console.log(iTunesArtistResponse.data);
      //   res.send(iTunesArtistResponse.data);
      // })
    })
  }
}