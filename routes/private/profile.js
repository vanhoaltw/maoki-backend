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

// router.put("/:id", (req, res, next) => {
//   try {
//     const id = req.params.id;
//     res.json("put id" + id);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, photoURL, newPassword, phone } = req.body;

    const result = await User.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          photoURL: photoURL,
          password: newPassword,
          phone: phone,
        },
      }
    );

    result.json(result);
    if (result.nModified > 0) {
      res.json({ success: true, message: "User updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error in updating user",
    });
  }
});

module.exports = router;
