const router = require("express").Router();
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

const bcrypt = require("bcrypt"); //TODO: implement
router.post("/register", async (req, res, next) => {
  const data = req.body;
  try {
    // Data validation
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.phone ||
      !data.age ||
      !data.gender ||
      !data.NID
    ) {
      throwError("All fields are required", 400);
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({email: data.email});
    if (existingUser) {
      throwError("Email is already in use", 409);
    }

    // Create a new user using the Mongoose model
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      photoURL: data.photoURL || "", // Optional photo URL
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      NID: data.NID,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({message: "User created successfully", user: newUser});
  } catch (error) {
    next(error);
  }
});

router.post("/login", (req, res) => {
  const data = req.body;

  res.end("Auth -> login");
});

router.post("/logout", (req, res) => {
  // TODO: need to research
  res.end("Auth -> logout");
});

module.exports = router;
