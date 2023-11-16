const router = require("express").Router();
const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const throwError = require("../../utils/throwError");
const hotelRoutes = require("./hotel");
const roomRoutes = require("./room");
const bookingHistoryRoutes = require("./booking-history");

router.use("/room", roomRoutes);
router.use("/hotel", hotelRoutes);
router.use("/booking-history", bookingHistoryRoutes);

router.get("/", async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({managerId: req.user._id});
    if (!hotel) throwError("No such hotel");

    const rooms = await Room.countDocuments({hotelId: hotel._id});

    res.json({rooms, currentBooking: 0, totalBooking: 0, totalCustomer: 0});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
