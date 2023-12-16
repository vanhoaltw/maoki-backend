const router = require("express").Router();

const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");
const isManager = require("../middlewares/isManager");

const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const managerRoutes = require("./manager");
const privateRoutes = require("./private");
const publicRoutes = require("./public");
const paymentRoutes = require("./payment");

router.use("/auth", authRoutes);

router.use("/admin", authenticate, isAdmin, adminRoutes);

router.use("/public", publicRoutes);
router.use("/payment", paymentRoutes);

router.use("/manager", authenticate, managerRoutes);
router.use("/", authenticate, privateRoutes);

// Error 404 Page Not Found
router.use((req, res, next) => {
  res.status(404).json({ message: "404 Route is unavailable." });
});

module.exports = router;
