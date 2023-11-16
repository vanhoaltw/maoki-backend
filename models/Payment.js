const {Schema, model} = require("mongoose");

const paymentSchema = new Schema({
  transactionId: {
    type: String,
    required: [true, "transactionId is required"],
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "roomId is required"],
  },
  rooms: [
    {
      roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "roomId is required"],
      },
      checkIn: {type: Date, default: null},
      checkOut: {type: Date, default: null},
      adult: {
        type: Number,
        required: [true, "Adult capacity is required"],
        min: [0, "Adult capacity cannot be negative"],
        max: [6, "max capacity 6"],
      },
      children: {
        type: Number,
        required: [true, "children capacity is required"],
        min: [0, "children capacity cannot be negative"],
        max: [6, "max capacity 6"],
      },
    },
  ],
  cardType: {
    type: String,
    default: "Unknown",
  },
  status: {
    type: String,
    enum: ["PENDING", "VALID", "CANCELLED", "FAILED"],
    default: "PENDING",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
