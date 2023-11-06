const router = require("express").Router();
const userRoutes = require("./user");
const bookingRoutes = require("./booking");
const blogRoutes = require("./blog");
const wishlistRoutes = require("./wishlist");
const profileRoutes = require("./profile");

router.use("/user", userRoutes);
router.use("/booking", bookingRoutes);
router.use("/blog", blogRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
