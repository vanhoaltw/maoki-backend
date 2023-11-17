const router = require("express").Router();
const hotelRoutes = require("./hotel");
const galleryRoutes = require("./gallery");
const locationsRoutes = require("./locations");
const blogRoutes = require("./blog");
const topLocationsRoutes = require("./top-locations");
const reviewRoutes = require("./review");
const reviewTopRoutes = require("./review-top");

router.use("/hotel", hotelRoutes);
router.use("/gallery", galleryRoutes);
router.use("/locations", locationsRoutes);
router.use("/blog", blogRoutes);
router.use("/top-locations", topLocationsRoutes);
router.use("/review", reviewRoutes);
router.use("/review-top", reviewTopRoutes);

module.exports = router;
