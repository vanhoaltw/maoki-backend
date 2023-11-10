const router = require("express").Router();
const User = require("../../models/User");
const throwError = require("../../utils/throwError");
const bcrypt = require("bcrypt");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) throwError("id must be provided", 404);

    let user = await User.findById(id);

    if (!user) throwError("User not found", 404);

    user = {
      name: user.name,
      photoURL: user.photoURL,
      age: user.age,
      gender: user.gender,
      joined: user.createdAt,
    };

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = req.body;

    const {
      name,
      phone,
      photoURL,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = data;

    const existingUser = await User.findById(req.user._id);
    if (!existingUser) throwError("User not found", 404);

    if (existingUser.password) {
    }

    const isMatchPassword = await bcrypt.compare(
      data.currentPassword,
      existingUser.password
    );

    if (!isMatchPassword) throwError("Invalid old password", 404);

    const result = await User.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          name: name,
          photoURL: photoURL,
          phone: phone,
        },
      }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
