const router = require("express").Router();
const mangerController = require("../controllers/managerController");

router.get("/hotel", mangerController.getHotel);

router.post("/hotel", mangerController.postHotel);

router.put("/hotel", mangerController.updateHotel);

router.delete("/hotel", mangerController.deleteHotel);

router.get("/", async (req, res, next) => {
  try {
    res.end("Hello");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
