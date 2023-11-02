const role = require("../../constants/role");
const Booking = require("../../models/Booking");
const Room = require("../../models/Room");
const isFieldsRequired = require("../../utils/isFieldsRequired");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const booking = await Booking.find({customerId: req.user._id});

    if (!booking) throwError("Booking not found");

    res.json(booking);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req.user.role == role.ADMIN || req.user.role == role.MANAGER) {
      throwError("You cannot able to reserve a booking for this role.");
    }

    let data = req.body;

    const isRequired = isFieldsRequired(data, [
      "roomId",
      "checkIn",
      "checkOut",
    ]);
    if (!isRequired) throwError("filed is required");

    const isExistRoom = await Room.findById(data.roomId);
    if (!isExistRoom) throwError("Room not found");

    const capacity = isFieldsRequired(data.capacity, ["adult"]);

    if (!capacity) throwError("Capacity is require");

    data = {
      ...data,
      customerId: req.user._id,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
    };

    if (
      data.checkIn < isExistRoom.availability.checkOut &&
      data.checkOut > isExistRoom.availability.checkIn
    ) {
      throwError("Already booked the room in this time");
    }

    const booking = new Booking(data);
    await booking.save();

    // TODO: isBlocked will be false when check in and check out data to current date passed
    await Room.findByIdAndUpdate(data.roomId, {
      $inc: {bookedCount: 1},
      "availability.isBlocked": true,
      "availability.checkIn": new Date(data.checkIn),
      "availability.checkOut": new Date(data.checkOut),
    });

    res.json({message: "Booking successfully!", booking});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
