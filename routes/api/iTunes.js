const router = require("express").Router();
const iTunesController = require("../../controllers/iTunesController");

// Matches with "/api/spotify/:artist"
router
  .route("/:artist")
  .get(iTunesController.iTunesSearch)

module.exports = router;
