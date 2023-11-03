const {Schema, model} = require("mongoose");

const blogLikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  blogId: {
    type: Schema.Types.ObjectId,
    required: [true, "Blog ID is required"],
    ref: "Blog",
  },
});

const BlogLike = model("Blog", blogLikeSchema);

module.exports = BlogLike;
