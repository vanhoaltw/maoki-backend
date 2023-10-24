const router = require("express").Router();
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

router.get("/role", async (req, res, next) => {
  try {
    res.json("role");
  } catch (error) {
    next(error);
  }
});

router.put("/:id/role", async (req, res, next) => {
  try {
    res.json("role id");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json("dele id user");
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json("dele user");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const user = await User.find();

    if (user.length == 0) {
      throwError("User not found", 404);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
