const { uploadToS3 } = require("../../config/s3");
const { uploadImage } = require("../../middlewares/upload");

const router = require("express").Router();

router.post("/image", uploadImage.single("file"), async (req, res, next) => {
  try {
    const result = await uploadToS3(req.file);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
