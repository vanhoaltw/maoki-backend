const Blog = require("../../models/Blog");
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const {page = 1, limit = 10, descending = "false"} = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    // Define the sort direction based on the 'descending' query parameter
    const sortDirection = descending === "true" ? -1 : 1;

    const skip = (parsedPage - 1) * parsedLimit;

    let blog = await Blog.find()
      .sort({createdAt: sortDirection})
      .skip(skip)
      .limit(parsedLimit);

    if (blog.length == 0) throwError("Blog not found", 404);

    blog = await Promise.all(
      blog.map(async (singleBlog) => {
        const user = await User.findById(singleBlog.userId);
        return {
          _id: singleBlog._id,
          title: singleBlog.title,
          thumbnail: singleBlog.thumbnail,
          description: singleBlog._doc.description,
          likeCount: singleBlog.likeCount,
          publishDate: singleBlog.createdAt,
          userId: user._id,
          userName: user.name,
          userProfile: user.photoURL,
        };
      })
    );

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
