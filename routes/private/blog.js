const status = require("../../constants/status");
const Blog = require("../../models/Blog");
const isFieldsRequired = require("../../utils/isFieldsRequired");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const blog = await Blog.find({userId: req.user._id});

    if (!blog) throwError("Blog not found!", 404);

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    const isRequired = isFieldsRequired(data, [
      "title",
      "thumbnail",
      "description",
      "category",
    ]);

    if (!isRequired) throwError("Field is required", 404);

    if (data.description.length < 100)
      throwError("Description min length is 100");

    data.userId = req.user._id;

    const newBlog = new Blog(data);
    await newBlog.save();

    res.json({message: "Blog created successfully!"});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
