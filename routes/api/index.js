const router = require("express").Router();
const artistRoutes = require("./artist");
const userRoutes = require("./user");
const spotifyRoutes = require("./spotify")

// Book routes
router.use("/artists", artistRoutes);
router.use("/users", userRoutes);
router.use("/spotify", spotifyRoutes);

module.exports = router;
