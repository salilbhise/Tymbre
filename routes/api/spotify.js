const router = require("express").Router();
const spotifyController = require("../../controllers/spotifyController");

// Matches with "/api/spotify/:artist"
router
  .route("/:artist")
  .get(spotifyController.spotifySearch)

module.exports = router;
