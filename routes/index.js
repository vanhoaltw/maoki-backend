const router = require("express").Router();

const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");

const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const managerRoutes = require("./manager");
const isManager = require("../middlewares/isManager");

router.use("/auth", authRoutes);
router.use("/admin", authenticate, isAdmin, adminRoutes);
router.use("/manager", authenticate, isManager, managerRoutes);

// Home route
router.get("/", (req, res) => {
  res.send("<h1>HotelHaven is available.</h1>");
});

// Error 404 Page Not Found
router.use((req, res, next) => {
  res.status(404).json({message: "404 Route is not available."});
});

module.exports = router;
