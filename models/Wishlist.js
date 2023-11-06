const {Schema, model} = require("mongoose");

const wishlistSchema = new Schema({
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
});

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;
