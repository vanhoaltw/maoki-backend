const router = require("express").Router();
const userRoutes = require("./user");
const bookingRoutes = require("./booking");
const blogRoutes = require("./blog");
const wishlistRoutes = require("./wishlist");

router.use("/user", userRoutes);
router.use("/booking", bookingRoutes);
router.use("/blog", blogRoutes);
router.use("/wishlist", wishlistRoutes);

module.exports = router;
