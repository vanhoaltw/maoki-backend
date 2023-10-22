const router = require("express").Router();
const User = require("../../models/User");
const throwError = require("../../utils/throwError");
const bcrypt = require("bcrypt");

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
      !data.nid
    ) {
      throwError("All fields are required", 400);
    }

    if (data.password.length < 8) {
      throwError("Password must be at least 8 characters", 400);
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({email: data.email});
    if (existingUser) {
      throwError("Email is already in use", 409);
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the number of salt rounds

    // Create a new user using the Mongoose model
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword, // Store the hashed password
      photoURL: data.photoURL || "", // Optional photo URL
      phone: data.phone,
      age: data.age,
      gender: data.gender.toUpperCase(),
      nid: data.nid,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({message: "User created successfully", user: newUser});
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
});

router.post("/login", (req, res, next) => {
  const data = req.body;

  try {
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res) => {
  // TODO: need to research
  res.end("Auth -> logout");
});

module.exports = router;
