const router = require("express").Router();
const hotelRoutes = require("./hotel");
const galleryRoutes = require("./gallery");

router.use("/hotel", hotelRoutes);
router.use("/gallery", galleryRoutes);

module.exports = router;
