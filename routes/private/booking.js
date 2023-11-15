const Hotel = require("../../models/Hotel");
const Payment = require("../../models/Payment");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    let bookingDetails = await Payment.find({email: req.user.email});

    if (bookingDetails.length === 0) {
      throw new Error("Booking details not found");
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
        };
      })
    );

    res.json(bookingDetails);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
