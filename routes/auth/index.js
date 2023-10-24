const router = require("express").Router();

const registerController = require("../../controllers/auth/register-controller");
const loginController = require("../../controllers/auth/login-controller");

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", (req, res) => {
  // TODO: need to research
  res.end("Auth -> logout");
});

module.exports = router;
