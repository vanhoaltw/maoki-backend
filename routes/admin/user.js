const router = require("express").Router();
const gender = require("../../constants/gender");
const role = require("../../constants/role");
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("Invalid id", 404);

    const fendedUser = await User.findById(id);
    if (!fendedUser) throwError("User not found", 404);

    res.json(fendedUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) throwError("Invalid id", 404);
    if (data?.password) throwError("Password can't be change", 404);
    if (data?.email) throwError("Email can't be change", 404);

    // check validation if->  gender: undefined, role: undefined
    data.role =
      role[data.role.toUpperCase()] ||
      throwError("ROLE: please provide correct value", 404);
    data.gender =
      gender[data.gender.toUpperCase()] ||
      throwError("GENDER: please provide correct value", 404);

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({message: "User not found"});
    }

    // Compare the existing data with the new data
    const dataIsSame =
      JSON.stringify(existingUser.toObject()) ===
      JSON.stringify({...existingUser.toObject(), ...data});

    if (dataIsSame) {
      return res
        .status(400)
        .json({message: "No changes to apply, user data is the same."});
    }

    const updatedUser = await User.findOneAndUpdate({_id: id}, data, {
      new: true,
      upsert: true,
    });

    if (!updatedUser) throwError("User not found", 404);

    res.json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("Invalid id", 404);

    const fendedUser = await User.findById(id);
    if (!fendedUser) throwError("User not found", 404);

    res.json(fendedUser);
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
