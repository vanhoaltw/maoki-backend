const router = require("express").Router();
const userRoutes = require("./user");
const hotelDetailsRoutes = require("./hotel-details");

router.use("/user", userRoutes);
router.use("/hotel", hotelDetailsRoutes);

module.exports = router;
