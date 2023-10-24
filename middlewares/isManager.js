const role = require("../constants/role");
const throwError = require("../utils/throwError");

const isManager = (req, res, next) => {
  try {
    if (req.user && req.user.role !== role.MANAGER) {
      throwError("Access forbidden. You are not an manager.", 403);
    }
    if (req.user && req.user.role === role.MANAGER) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isManager;
