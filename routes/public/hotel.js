const router = require("express").Router();
const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");

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

router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    let hotel = await Hotel.find().skip(skip).limit(limit);

    if (!hotel) throwError("Hotel not found!", 404);

    hotel = hotel.map((singleHotel) => {
      return {
        _id: singleHotel._id,
        name: singleHotel.name,
        location: singleHotel.address.location,
        photoURL: singleHotel.photoURL,
        description: singleHotel.description.slice(0, 60),
        rating: 0, // TODO: will be updated
      };
    });

    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
