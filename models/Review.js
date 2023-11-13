const {Schema, model} = require("mongoose");

const reviewSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    required: [true, "roomId id must be provided"],
    ref: "Room",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "userId id must be provided"],
    ref: "User",
  },
  feedback: {
    type: String,
    maxLength: 100,
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
