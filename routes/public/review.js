const router = require("express").Router();

router.get("/:hotelId", (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
