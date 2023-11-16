const router = require("express").Router();
const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");
const hotelRoutes = require("./hotel");
const roomRoutes = require("./room");
const bookingHistoryRoutes = require("./booking-history");
const Payment = require("../../models/Payment");

router.use("/room", roomRoutes);
router.use("/hotel", hotelRoutes);
router.use("/booking-history", bookingHistoryRoutes);

router.get("/", async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({managerId: req.user._id});
    if (!hotel) throwError("No such hotel");

    const rooms = await Room.countDocuments({hotelId: hotel._id});

    const totalCustomer = await Payment.distinct("email", {hotelId: hotel._id});

    const totalBooking = await Payment.countDocuments({hotelId: hotel._id});

    const currentDate = new Date(); // Current date

    const currentBookings = await Payment.find({
      hotelId: hotel._id,
      rooms: {
        $elemMatch: {
          checkIn: {$lte: currentDate},
          checkOut: {$gte: currentDate},
        },
      },
    });

    const pendingBooking = await Payment.find({
      hotelId: hotel._id,
      rooms: {
        $elemMatch: {
          checkIn: {$gte: currentDate},
        },
      },
    });

    res.json({
      rooms,
      currentBooking: currentBookings.length,
      pendingBooking: pendingBooking.length,
      totalBooking: totalBooking,
      totalCustomer: totalCustomer.length,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
