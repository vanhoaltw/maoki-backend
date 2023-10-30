const router = require("express").Router();
const hotelController = require("../../controllers/manager/hotel-controller");

router.get("/", hotelController.getHotel);

router.post("/", hotelController.postHotel);

router.put("/", hotelController.updateHotel);

router.delete("/", hotelController.deleteHotel);

module.exports = router;
