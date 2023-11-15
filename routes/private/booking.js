const Payment = require("../../models/Payment");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const bookingDetails = await Payment.find({email: req.user.email});

    if (!bookingDetails) {
      throwError("Booking details not found");
    }
    res.json(bookingDetails);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
