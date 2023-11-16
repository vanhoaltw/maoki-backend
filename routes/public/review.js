const Review = require("../../models/Review");
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/:hotelId", async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    if (!hotelId) throwError("hotelId is required", 404);

    let review = await Review.find({hotelId});

    review = await Promise.all(
      review.map(async (rev) => {
        const user = await User.findById(rev.userId);

        return {
          ...rev._doc,
          userName: user.name,
          userProfile: user.photoURL,
        };
      })
    );

    if (!review) throwError("No review found");

    res.json(review);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
