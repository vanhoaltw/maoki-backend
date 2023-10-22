const router = require("express").Router();

const profileRoutes = require("./profile");

router.use(profileRoutes);

router.get("/:email", (req, res) => {
  const email = req.params.email;
  res.json({email});
});

module.exports = router;
