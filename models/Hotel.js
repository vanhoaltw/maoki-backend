const { Schema, model } = require("mongoose");

const hotelSchema = new Schema(
  {
    photoURL: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    availableRooms: { type: Number, required: true, min: 0 }, // Assuming available rooms is a number and it can't be negative
    location: { type: String, required: true },
    map: {
      lat: { type: Number, required: true, min: -90, max: 90 }, // Latitude validation
      lng: { type: Number, required: true, min: -180, max: 180 }, // Longitude validation
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
