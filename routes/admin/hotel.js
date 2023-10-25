const router = require("express").Router();
const hotelController = require("../../controllers/admin/hotel-controller");

router.put("/status/:id", hotelController.updateStatus);

router.get("/review", async (req, res, next) => {
  try {
    res.json("review");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", hotelController.getHotelById);

router.get("/", hotelController.getHotel);

module.exports = router;
