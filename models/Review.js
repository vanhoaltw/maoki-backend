const {Schema, model} = require("mongoose");

const reviewSchema = new Schema({
  hotelId: {
    type: Schema.Types.ObjectId,
    required: [true, "roomId id must be provided"],
    ref: "Hotel",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "userId id must be provided"],
    ref: "User",
  },
  feedback: {
    type: String,
    maxLength: 250,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
