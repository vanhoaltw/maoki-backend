const User = require("../../models/User");
const throwError = require("../../utils/throwError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res, next) => {
  const data = req.body;
  try {
    if (!data.password) throwError("Password is required", 404);
    if (!data.email) throwError("Email is required", 404);

    const user = await User.findOne({email: data.email});

    if (!user) throwError("User is not found", 404);

    const isMatchPassword = await bcrypt.compare(data.password, user.password);

    if (!isMatchPassword) throwError("Invalid password", 404);

    const payload = {
      name: user._doc?.name,
      email: user._doc?.email,
      gender: user._doc?.gender,
      age: user._doc?.age,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    delete user._doc?.password;
    delete user._doc?.nid;

    res.json({message: "User Lodged In Successfully", token, user});
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
