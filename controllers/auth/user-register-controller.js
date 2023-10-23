const User = require("../../models/User");
const throwError = require("../../utils/throwError");
const bcrypt = require("bcrypt");

userRegisterController = async (req, res, next) => {
  const data = req.body;
  data.gender = data?.gender.toUpperCase();

  const requiredFields = [
    "name",
    "email",
    "password",
    "phone",
    "age",
    "gender",
    "nid",
  ];

  try {
    // check the fields is required
    const isRequired = requiredFields.some((field) => !data[field]);

    // Data validation
    if (isRequired) {
      throwError("All fields are required", 400);
    }

    if (data.password.length < 8) {
      throwError("Password must be at least 8 characters", 400);
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the number of salt rounds

    data.password = hashedPassword;

    if (data.age < 18) {
      throwError("Age must be at least 18 years", 400);
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({
      $or: [{email: data.email}, {phone: data.phone}],
    });

    if (existingUser?.email === data.email) {
      throwError("Email is already in use", 409);
    }

    if (existingUser?.phone === data.phone) {
      throwError("Phone Number is already in use", 409);
    }

    // Create a new user using the Mongoose model
    const newUser = new User({...data});

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({message: "User created successfully", user: newUser});
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

module.exports = userRegisterController;
