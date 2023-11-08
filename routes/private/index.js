const router = require("express").Router();
const userRoutes = require("./user");
const bookingRoutes = require("./booking");
const blogRoutes = require("./blog");
const wishlistRoutes = require("./wishlist");
const profileRoutes = require("./profile");
const paymentRoutes = require("./payment");

router.use("/user", userRoutes);
router.use("/booking", bookingRoutes);
router.use("/blog", blogRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/profile", profileRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
