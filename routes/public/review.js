const Review = require("../../models/Review");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/:hotelId", async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    if (!hotelId) throwError("hotelId is required", 404);

    const review = await Review.find({hotelId});

    if (!review) throwError("No review found");

    res.json(review);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
