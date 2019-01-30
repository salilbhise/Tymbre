const router = require("express").Router();
const artistRoutes = require("./artist");
const userRoutes = require("./user");
const spotifyRoutes = require("./spotify");
const lastFMRoutes = require("./lastFM");
const iTunesRoutes = require('./iTunes');

// Book routes
router.use("/artists", artistRoutes);
router.use("/users", userRoutes);
router.use("/spotify", spotifyRoutes);
router.use("/lastfm", lastFMRoutes);
router.use("/itunes", iTunesRoutes);


module.exports = router;
