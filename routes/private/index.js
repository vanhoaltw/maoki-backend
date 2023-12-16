const router = require("express").Router();
const userRoutes = require("./user");
const bookingRoutes = require("./booking");
const blogRoutes = require("./blog");
const wishlistRoutes = require("./wishlist");
const profileRoutes = require("./profile");
const roomRoutes = require("./room");
const reviewRoutes = require("./review");
const hotelRoutes = require("./hotel");
const uploadRoutes = require("./upload");

router.use("/user", userRoutes);
router.use("/room", roomRoutes);
router.use("/booking", bookingRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/blog", blogRoutes);
router.use("/profile", profileRoutes);
router.use("/review", reviewRoutes);
router.use("/hotel", hotelRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
