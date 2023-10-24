const router = require("express").Router();

const userController = require("../../controllers/admin/user-controller");

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.userDeleteById);

router.get("/", userController.getUser);

module.exports = router;
