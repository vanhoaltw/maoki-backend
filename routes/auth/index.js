const router = require("express").Router();

const continueWithGoogle = require("../../controllers/auth/continue-with-google");
const registerController = require("../../controllers/auth/register-controller");
const loginController = require("../../controllers/auth/login-controller");

router.post("/continue-with-google", continueWithGoogle);

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", (req, res) => {
  // TODO: need to research
  res.end("Auth -> logout");
});

module.exports = router;
