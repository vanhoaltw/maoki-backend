const {Schema, model} = require("mongoose");

const bookmarkSchema = new Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    required: [true, "blogId id must be provided"],
    ref: "Blog",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "userId id must be provided"],
    ref: "User",
  },
});

const BlogBookmark = model("BlogBookmark", bookmarkSchema);

module.exports = BlogBookmark;
