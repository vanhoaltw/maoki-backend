const Blog = require("../../models/Blog");
const BlogBookmark = require("../../models/BlogBookmark");
const BlogLike = require("../../models/BlogLike");
const User = require("../../models/User");
const changesDetected = require("../../utils/changesDetected");
const isFieldsRequired = require("../../utils/isFieldsRequired");
const throwError = require("../../utils/throwError");
const router = require("express").Router();

router.get("/user-blog/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("id is required", 404);

    const blog = await Blog.findOne({_id: id, userId: req.user._id});

    if (!blog) throwError("Blog not found", 404);

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.put("/user-blog/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) throwError("id is required", 404);

    const existingBlog = await Blog.findOne({_id: id, userId: req.user._id});

    if (!existingBlog) throwError("Blog not found", 404);

    if (changesDetected(existingBlog, data)) {
      throwError("No changes to apply, user data is the same.", 404);
    }

    await Blog.findOneAndUpdate(
      {_id: existingBlog._id, userId: req.user._id},
      {
        title: data.title,
        thumbnail: data.thumbnail,
        description: data.description,
        category: data.category,
      }
    );

    res.json({message: "blog updated successfully"});
  } catch (error) {
    next(error);
  }
});

router.delete("/user-blog/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("id is required", 404);

    const existingBlog = await Blog.findOne({_id: id, userId: req.user._id});

    if (!existingBlog) throwError("Blog not found", 404);

    const result = await Blog.findByIdAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!result) throwError("Blog is not deleted", 404);

    res.json({message: "Blog deleted successfully"});
  } catch (error) {
    next(error);
  }
});

router.get("/user-blog", async (req, res, next) => {
  try {
    const blog = await Blog.find({userId: req.user._id});

    if (!blog) throwError("Blog not found!", 404);

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.post("/user-blog", async (req, res, next) => {
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

/******** BLOG BOOKMARK ******* */
router.get("/bookmark", async (req, res, next) => {
  try {
    let bookmark = await BlogBookmark.find({userId: req.user._id});

    if (!bookmark) throwError("bookmark not found", 404);

    bookmark = await Promise.all(
      bookmark.map(async (singleBookmark) => {
        const blog = await Blog.findById(singleBookmark.blogId);
        return {
          _id: singleBookmark._id,
          blogId: singleBookmark.blogId,
          blogTitle: blog.title || "",
          blogThumbnail: blog.thumbnail || "",
        };
      })
    );
    bookmark = bookmark.filter((bookmark) => bookmark !== null);

    res.json(bookmark);
  } catch (error) {
    next(error);
  }
});

router.post("/bookmark", async (req, res, next) => {
  try {
    const blogId = req.body.blogId;

    if (!blogId) {
      throwError("blogId must be provide", 404);
    }

    const existingBookmark = await BlogBookmark.findOne({
      blogId,
      userId: req.user._id,
    });

    if (existingBookmark) {
      throwError("Bookmark already saved", 409);
    }

    const newBookmark = new BlogBookmark({blogId, userId: req.user._id});
    await newBookmark.save();

    res.json({message: "Bookmark saved successfully"});
  } catch (error) {
    next(error);
  }
});

router.delete("/bookmark/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("id must be provide");

    const existingBookmark = await BlogBookmark.findOne({
      userId: req.user._id,
      $or: [{blogId: id}, {_id: id}],
    });

    if (!existingBookmark) throwError("Bookmark not found");

    const bookmark = await BlogBookmark.findByIdAndDelete(existingBookmark._id);

    if (!bookmark) throwError("Bookmark not delete");

    res.json({message: "Bookmark deleted successfully"});
  } catch (error) {
    next(error);
  }
});

router.get("/liked", async (req, res, next) => {
  try {
    let likedBlog = await BlogLike.find({userId: req.user._id});

    likedBlog = likedBlog.map((liked) => liked.blogId);

    res.json(likedBlog);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/like", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("id is required", 404);

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) throwError("Blog not found", 404);

    const existingLike = await BlogLike.findOne({
      blogId: id,
      userId: req.user._id,
    }).exec();

    if (existingLike) throwError("Already liked", 404);

    const blogLike = BlogLike({blogId: id, userId: req.user._id});
    await blogLike.save();

    existingBlog.likeCount += 1;
    await existingBlog.save();

    res.json({message: "Liked successfully"});
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/unlike", async (req, res, next) => {
  // unlike means if already liked then remove like
  try {
    const id = req.params.id;
    if (!id) throwError("id is required", 404);

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) throwError("Blog not found", 404);

    const result = await BlogLike.findOneAndDelete({
      blogId: id,
      userId: req.user._id,
    });

    if (!result) throwError("Like not found", 404);

    existingBlog.likeCount -= 1;
    await existingBlog.save();

    res.json({message: "Like removed successfully"});
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("id is required", 404);

    let blog = await Blog.findOne({_id: id});

    if (!blog) throwError("Blog not found", 404);

    const user = await User.findOne({_id: blog.userId});

    if (!user) throwError("User not found", 404);

    blog = {
      ...blog._doc,
      userName: user.name,
      userProfile: user.photoURL,
    };

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
