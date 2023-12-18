const router = require("express").Router();
const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const catchAsync = require("../../utils/catchAsync");
const throwError = require("../../utils/throwError");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = req.query;
    if (!id) throwError("Invalid id");

    const hotel = await Hotel.findById(id);

    if (!hotel) throwError("No hotel found");

    let rooms = [];

    if (query.checkIn && query.checkOut) {
      rooms = await Room.find({
        hotelId: hotel._id,
        $or: [
          {
            "availability.checkIn": { $lte: new Date(query.checkOut) },
            "availability.checkOut": { $gte: new Date(query.checkIn) },
          },
          {
            "availability.isBlocked": false,
          },
        ],
      });
    } else {
      rooms = await Room.find({ hotelId: hotel._id });
    }

    res.json({ hotel, rooms });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    let hotel = [];

    let count = 0;

    if (query.location) {
      hotel = await Hotel.find({ "address.location": query.location })
        .skip(skip)
        .limit(limit)
        .exec();
      count = await Hotel.countDocuments({
        "address.location": query.location,
      });
    } else {
      hotel = await Hotel.find().skip(skip).limit(limit).exec();
      count = await Hotel.countDocuments();
      return res.json({
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: hotel,
      });
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
                "availability.checkIn": { $lte: new Date(query.checkOut) },
                "availability.checkOut": { $gte: new Date(query.checkIn) },
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

    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/getByUserId/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const results = await Hotel.find({ managerId: id });
    res.json(results);
  })
);
module.exports = router;
