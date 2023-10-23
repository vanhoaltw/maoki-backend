const router = require("express").Router();

router.get("/", (req, res) => {
  res.end("hotel");
});

module.exports = router;
