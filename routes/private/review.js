const router = require("express").Router();

router.post("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
