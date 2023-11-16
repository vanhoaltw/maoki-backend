const Review = require("../../models/Review");
const isFieldsRequired = require("../../utils/isFieldsRequired");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    const isRequiredField = isFieldsRequired(data, [
      "hotelId",
      "feedback",
      "rating",
    ]);

    console.log(data, isRequiredField);

    if (!isRequiredField)
      throwError("feedback, rating, hotelId is required", 404);

    if (data.feedback.length > 250)
      throwError("maximum feedback length is 250", 404);

    // Create a new review instance
    const newReview = new Review({
      hotelId: data.hotelId,
      userId: req.user._id,
      feedback: data.feedback,
      rating: data.rating,
    });

    const result = await newReview.save();
    if (!result) throwError("Couldn't create review", 404);

    res.json({message: "Review created successfully!"});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
