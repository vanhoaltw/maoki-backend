const status = require("../../constants/status");
const Blog = require("../../models/Blog");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findOne({_id: id, status: status.APPROVED});

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const blog = await Blog.find({status: status.APPROVED});

    if (blog.length == 0) throwError("Blog not found", 404);

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
