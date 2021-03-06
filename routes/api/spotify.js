const router = require("express").Router();
const spotifyController = require("../../controllers/spotifyController");

// Matches with "/api/spotify/:artist"
router
  .route("/:artist")
  .get(spotifyController.spotifySearch);

router.route("/:searchArtist")
  .get(spotifyController.spotifySearchBarSearch);

module.exports = router;
