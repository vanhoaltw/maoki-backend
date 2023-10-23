const router = require("express").Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const adminRoutes = require("./admin");
const hotelRoutes = require("./hotel");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/hotel", hotelRoutes);

// Home route
router.get("/", (req, res) => {
  res.send("<h1>HotelHaven is available.</h1>");
});

// Error 404 Page Not Found
router.use((req, res, next) => {
  res.status(404).json({message: "404 Route is not available."});
});

module.exports = router;
