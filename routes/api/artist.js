const router = require("express").Router();
const artistsController = require("../../controllers/artistsController");

// Matches with "/api/artist"
router.route("/")
  .get(artistsController.findAll)
  .post(artistsController.create);

// Matches with "/api/artist/:id"
router
  .route("/:id")
  .get(artistsController.findById)
  .put(artistsController.update)
  .delete(artistsController.remove);

module.exports = router;
