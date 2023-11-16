const Hotel = require("../../models/Hotel");
const Payment = require("../../models/Payment");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({managerId: req.user._id});

    if (!hotel) throwError("No hotel found", 404);

    // booking history means paymentHistory
    const bookingHistory = await Payment.find({hotelId: hotel._id});
    if (bookingHistory) throwError("payment History not found", 404);

    res.json(bookingHistory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
