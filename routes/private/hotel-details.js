const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("Invalid id");

    const hotel = await Hotel.findById(id);

    if (!hotel) throwError("No hotel found");

    const rooms = await Room.find({hotelId: hotel._id});

    res.json({hotel, rooms});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
