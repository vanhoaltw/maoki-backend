const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/roomIds", async (req, res, next) => {
  try {
    const roomIds = req.query.roomIds;
    if (roomIds.length == 0) throwError("give me roomIds []", 404);

    const rooms = await Room.find({_id: {$in: roomIds}});

    if (!rooms) throwError("Room not found", 404);

    res.json(rooms);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const room = await Room.findById(id);
    if (!room) throwError("room not found", 404);

    const hotel = await Hotel.findById(room.hotelId);

    if (!hotel) throwError("hotel not found", 404);

    res.json({room, hotel});
  } catch (error) {
    next(error);
  }
});
module.exports = router;
