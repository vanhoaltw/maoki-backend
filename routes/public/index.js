const router = require("express").Router();
const hotelRoutes = require("./hotel");
const galleryRoutes = require("./gallery");
const locationsRoutes = require("./locations");
const blogRoutes = require("./blog");
const topLocationsRoutes = require("./top-locations");

router.use("/hotel", hotelRoutes);
router.use("/gallery", galleryRoutes);
router.use("/locations", locationsRoutes);
router.use("/blog", blogRoutes);
router.use("/top-locations", topLocationsRoutes);

module.exports = router;
