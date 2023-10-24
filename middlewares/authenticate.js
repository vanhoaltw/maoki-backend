const jwt = require("jsonwebtoken");
const throwError = require("../utils/throwError");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers?.authorization;
    if (!authorization) throwError("Authorization header is missing", 401);

    const token = authorization.split(" ")[1];
    if (!token) throwError("Token is missing in the authorization header", 401);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const isValidUser = await User.findOne({email: decoded.email});

    if (!isValidUser)
      throwError("User not found or authentication failed", 401);

    req.user = isValidUser;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
