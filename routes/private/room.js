const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

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
