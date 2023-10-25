const User = require("../models/User");
const throwError = require("../utils/throwError");

const router = require("express").Router();

router.get("/:email", async (req, res, next) => {
  try {
    const email = req.params.email;
    if (!email) throwError("email is required", 404);

    const existingUser = await User.findOne({email}).exec();
    if (!existingUser) throwError("user not found", 404);

    res.json(existingUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
