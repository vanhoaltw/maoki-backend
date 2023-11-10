const router = require("express").Router();
const userRoutes = require("./user");
const bookingRoutes = require("./booking");
const blogRoutes = require("./blog");
const wishlistRoutes = require("./wishlist");
const profileRoutes = require("./profile");
const roomRoutes = require("./room");

router.use("/user", userRoutes);
router.use("/room", roomRoutes);
router.use("/booking", bookingRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/blog", blogRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
