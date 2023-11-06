const router = require("express").Router();
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) throwError("id must be provided", 404);

    let user = await User.findById(id);

    if (!user) throwError("User not found", 404);

    user = {
      name: user.name,
      profileURL: user.profileURL,
      age: user.age,
      gender: user.gender,
      joined: user.createdAt,
    };

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    res.json("put id" + id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
