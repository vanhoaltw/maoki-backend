const Blog = require("../../models/Blog");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    let blog = await Blog.find();

    if (blog.length == 0) throwError("Blog not found", 404);

    blog = blog.map((singleBlog) => ({
      ...singleBlog._doc,
      description: singleBlog._doc.description.slice(0, 100),
    }));

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
