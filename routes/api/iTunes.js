const router = require("express").Router();
const iTunesController = require("../../controllers/iTunesController");

// Matches with "/api/spotify/:artist"
router
  .route("/:artist")
  .get(iTunesController.iTunesSearch)

  router.route("/albumSearch/:artist")
  .get(iTunesController.iTunesTrackInformationSearch);

module.exports = router;
