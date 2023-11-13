const router = require("express").Router();
const roomController = require("../../controllers/manager/room-controller");

router.get("/:id", roomController.getById);

router.put("/:id", roomController.updateById);

router.delete("/:id", roomController.deleteById);

router.get("/", roomController.get);

router.post("/", roomController.post);

module.exports = router;
