const Review = require("../../models/Review");
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const uniqueReviews = await Review.aggregate([
      {
        $group: {
          _id: "$userId",
          reviews: {$addToSet: "$$ROOT"},
        },
      },
      {
        $project: {
          _id: 0,
          reviews: {$slice: ["$reviews", 1]},
        },
      },
      {
        $unwind: "$reviews",
      },
    ]);

    if (!uniqueReviews || uniqueReviews.length === 0) {
      throwError("No unique reviews found based on userId", 404);
    }

    let uniqueReviewDocuments = uniqueReviews.map((item) => item.reviews);

    uniqueReviewDocuments = await Promise.all(
      uniqueReviewDocuments.map(async (rev) => {
        const user = await User.findById(rev.userId);

        return {
          ...rev,
          userName: user.name,
          userProfile: user.photoURL,
        };
      })
    );

    res.json(uniqueReviewDocuments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
