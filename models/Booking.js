const {Schema, model} = require("mongoose");

const bookingSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  capacity: {
    adult: {
      type: Number,
      default: 1,
      required: true,
    },
    children: {
      type: Number,
      default: 0,
    },
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
});

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
