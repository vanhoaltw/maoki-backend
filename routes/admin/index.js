const router = require("express").Router();

const userRoutes = require("./user");

router.use("/user", userRoutes);

router.get("/", (req, res) => {
  res.end("Admin");
});

module.exports = router;
