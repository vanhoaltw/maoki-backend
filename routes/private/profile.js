const router = require("express").Router();
const User = require("../../models/User");
const throwError = require("../../utils/throwError");
const bcrypt = require("bcrypt");
const validatePassword = require("../../utils/validatePassword");
const changesDetected = require("../../utils/changesDetected");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) throwError("id must be provided", 404);

    let user = await User.findById(id);

    if (!user) throwError("User not found", 404);

    user = {
      ...user._doc,
      joined: user.createdAt,
    };

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.user._id);
    if (!existingUser) throwError("You are not found", 404);

    res.json(existingUser);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const data = req.body;

    const {name, phone, photoURL, oldPassword, newPassword} = data;

    const updatedDoc = {};

    const existingUser = await User.findById(req.user._id);
    if (!existingUser) throwError("User not found", 404);

    if (name) {
      updatedDoc.name = name;
    }
    if (phone) {
      updatedDoc.phone = phone;
    }
    if (photoURL) {
      updatedDoc.photoURL = photoURL;
    }

    if (oldPassword && newPassword) {
      const isMatchPassword = await bcrypt.compare(
        data.oldPassword,
        existingUser.password
      );

      if (!isMatchPassword) throwError("Invalid old password", 404);

      const passwordError = validatePassword(newPassword);

      if (passwordError) {
        throwError(passwordError, 400);
      }

      const hashedPassword = await bcrypt.hash(data.newPassword, 10); // 10 is the number of salt rounds

      updatedDoc.password = hashedPassword;
    }

    if (changesDetected(existingUser, data)) {
      throwError("No changes to apply, user data is the same.", 400);
    }

    await User.findOneAndUpdate(
      {_id: req.user._id},
      {
        $set: updatedDoc,
      }
    );

    res.json({message: "profile updated successfully"});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
