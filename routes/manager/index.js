const router = require("express").Router();
const hotelRoutes = require("./hotel");
const roomRoutes = require("./room");

router.use("/room", roomRoutes);
router.use("/hotel", hotelRoutes);

router.get("/", async (req, res, next) => {
  try {
    res.end("Hello");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
