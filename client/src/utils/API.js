import axios from "axios";

export default {
  // Gets all artists
  getArtists: function () {
    return axios.get("/api/artists");
  },
  // Gets the artist with the given id
  getArtist: function (id) {
    return axios.get("/api/artists/" + id);
  },
  // Deletes the artist with the given id
  deleteArtist: function (id) {
    return axios.delete("/api/artists/" + id);
  },
  // Saves a artist to the database
  saveArtist: function (artistDatabase) {
    return axios.post("/api/artists", artistDatabase);
  },
  updateArtist: function(id, req) {
    return axios.put("/api/artists/" + id, req);
  },
  spotifySearch: function (artist) {
    return axios.get("/api/spotify/" + artist);
  },
  spotifySearchBarSearch: function (searchArtist) {
    return axios.get("/api/spotify" + searchArtist);
  },
  lastFMSearch: function (artist) {
    return axios.get("/api/lastfm/" + artist);
  },
  iTunesSearch: function (artist) {
    return axios.get("/api/itunes/" + artist);
  },
  iTunesTrackInformationSearch: function (artist) {
    return axios.get("/api/itunes/albumSearch/" + artist);
  }
};
