const {Schema, model} = require("mongoose");
const status = require("../constants/status");

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
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [status.PENDING, status.APPROVED, status.REJECTED],
      default: status.PENDING,
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
