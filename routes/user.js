const User = require("../models/User");
const throwError = require("../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    if (!req.user._id) throwError("identifier not found!", 404);

    const existingUser = await User.findOne({_id: req.user._id}).exec();
    if (!existingUser) throwError("user not found", 404);

    res.json(existingUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
