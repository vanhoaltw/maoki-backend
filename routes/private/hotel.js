const Hotel = require("../../models/Hotel");
const catchAsync = require("../../utils/catchAsync");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const id = req.user._id;
  const results = await Hotel.find({ managerId: id });
  return res.json(results);
});

module.exports = router;
