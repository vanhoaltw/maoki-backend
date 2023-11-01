const router = require("express").Router();
const hotelRoutes = require("./hotel");

router.use("/hotel", hotelRoutes);

module.exports = router;
