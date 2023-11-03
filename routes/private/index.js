const router = require("express").Router();
const userRoutes = require("./user");
const bookingRoutes = require("./booking");
const blogRoutes = require("./blog");

router.use("/user", userRoutes);
router.use("/booking", bookingRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
