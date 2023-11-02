const router = require("express").Router();
const hotelRoutes = require("./hotel");
const galleryRoutes = require("./gallery");
const locationsRoutes = require("./locations");

router.use("/hotel", hotelRoutes);
router.use("/gallery", galleryRoutes);
router.use("/locations", locationsRoutes);

module.exports = router;
