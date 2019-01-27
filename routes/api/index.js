const router = require("express").Router();
const artistRoutes = require("./artist");
const userRoutes = require("./user");

// Book routes
router.use("/artists", artistRoutes);
router.use("/users", userRoutes);

module.exports = router;
