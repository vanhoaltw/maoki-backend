const Hotel = require("../../models/Hotel");
const Payment = require("../../models/Payment");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    let bookingDetails = await Payment.find({email: req.user.email});

    if (bookingDetails.length === 0) {
      throwError("Booking details not found", 404);
    }

    bookingDetails = await Promise.all(
      bookingDetails.map(async (booking) => {
        const roomId = booking.rooms[0].roomId;
        const room = await Room.findById(roomId);
        const hotel = await Hotel.findById(room.hotelId);
        return {
          ...booking.toObject(),
          hotelName: hotel.name,
          hotelId: hotel._id,
          hotelLocation: hotel.address.location,
        };
      })
    );

    res.json(bookingDetails);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
