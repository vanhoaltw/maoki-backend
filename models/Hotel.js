const {Schema, model} = require("mongoose");

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
    },
    photoURL: {type: String, required: true},
    email: {type: String, required: [true, "Email is required"], unique: true},
    password: {type: String, required: [true, "Password is required"]},
    phone: {type: String, required: [true, "Phone is required"], unique: true},
    description: String,
    availableRooms: {
      type: Number,
      default: 0,
      min: 0,
    },
    location: String,
    map: {
      lat: {
        type: Number,
        min: -90,
        max: 90,
      },
      lng: {
        type: Number,
        min: -180,
        max: 180,
      },
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      required: [true, "Status is required"],
    },
  },
  {timestamps: true}
);

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
