const {Schema, model} = require("mongoose");

const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required"],
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "roomId is required"],
  },
  transactionId: {
    type: String,
    required: [true, "transactionId is required"],
  },
});

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
