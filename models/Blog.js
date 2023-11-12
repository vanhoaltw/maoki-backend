const {Schema, model} = require("mongoose");

const blogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      min: [100, "Description min length is 100"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    likeCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
