const router = require("express").Router();

router.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  res.json({id});
});

router.put("/profile/:id", (req, res) => {
  const id = req.params.id;
  res.json({id});
});

module.exports = router;
