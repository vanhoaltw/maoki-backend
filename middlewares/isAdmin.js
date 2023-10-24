const role = require("../constants/role");
const throwError = require("../utils/throwError");

const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role !== role.ADMIN) {
      throwError("Access forbidden. You are not an admin.", 403);
    }
    if (req.user && req.user.role === role.ADMIN) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
