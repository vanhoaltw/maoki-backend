const router = require("express").Router();

const userRegisterController = require("../../controllers/auth/user-register-controller");
const hotelRegisterController = require("../../controllers/auth/hotel-register-controller");

router.post("/register/user", userRegisterController);
router.post("/register/hotel", hotelRegisterController);

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
