const router = require("express").Router();
const userRoutes = require("./user");
const hotelDetailsRoutes = require("./hotel-details");
const bookingRoutes = require("./booking");

router.use("/user", userRoutes);
router.use("/hotel", hotelDetailsRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;
