const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    title: { type: String, required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: "Hotel" },
    facilities: [String],
    thumbnails: [String],
    isBooked: { type: Boolean, default: false },
    capacity: {
      adult: { type: Number, required: true, min: 0 }, // Latitude validation
      child: { type: Number, required: true, min: -180, max: 180 }, // Longitude validation
    },
    roomInfo: {
      roomSize: { type: String },
      bedType: { type: String },
      view: { type: String },
      regularPrice: { type: Number, required: true },
      discountedPrice: { type: Number },
      additionalInfo: { type: String },
    },
    availability: {},
  },
  { timestamps: true }
);

const Room = model("Room", roomSchema);

module.exports = Room;
