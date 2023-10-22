const router = require("express").Router();

router.get("/", (req, res) => {
  res.end("moderator");
});

module.exports = router;
