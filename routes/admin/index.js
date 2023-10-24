const router = require("express").Router();

const userRoutes = require("./user");
const hotelRoutes = require("./hotel");

router.use("/user", userRoutes);
router.use("/hotel", hotelRoutes);

router.get("/", (req, res) => {
  res.end("Admin");
});

module.exports = router;
