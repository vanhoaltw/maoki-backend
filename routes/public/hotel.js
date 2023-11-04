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
    const query = req.query;

    let hotel = [];

    if (query.location) {
      hotel = await Hotel.find({"address.location": query.location});
    } else {
      hotel = await Hotel.find();
    }

    if (query.checkIn || query.checkOut) {
      if (!query.checkIn || !query.checkOut) {
        throwError("checkIn and checkOut is required.", 404);
      }

      if (hotel.length == 0) throwError("Hotel not found!", 404);
      hotel = await Promise.all(
        hotel.map(async (singleHotel) => {
          const room = await Room.findOne({
            hotelId: singleHotel._id,
            $or: [
              {
                "availability.checkIn": {$lte: new Date(query.checkOut)},
                "availability.checkOut": {$gte: new Date(query.checkIn)},
              },
              {
                "availability.isBlocked": false,
              },
            ],
          });
          if (room) {
            return singleHotel;
          }
        })
      );

      hotel = hotel.filter(Boolean);
    }

    if (hotel.length == 0) throwError("Hotel not found!", 404);

    res.json({hotel});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
