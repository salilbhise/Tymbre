const router = require("express").Router();
const lastFMController = require("../../controllers/lastFMController");

// Matches with "/api/spotify/:artist"
router
  .route("/:artist")
  .get(lastFMController.lastFMSearch)

module.exports = router;
