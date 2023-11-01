const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const room = await Room.find();
    if (!room) throwError("Images not found!", 404);

    const gallery = room.map((singleRoom) => {
      return {
        _id: singleRoom._id,
        alt: singleRoom.title,
        imageURL: singleRoom.thumbnails[0],
      };
    });

    res.json(gallery);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
