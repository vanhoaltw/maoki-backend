const {Schema, model} = require("mongoose");
const status = require("../constants/status");

const hotelSchema = new Schema(
  {
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
    },
    photoURL: {
      type: String,
      required: [true, "Photo URL is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    availableRoom: {
      type: Number,
      required: [true, "Available Room is required"],
      default: 0,
      min: 0,
    },
    addedRoom: {
      type: Number,
      default: 0,
      min: [0, "Added Room cannot be negative"],
      max: [
        this.availableRoom - 1,
        "Added Room cannot be equal to or greater than Available Room",
      ],
    },

    address: {
      thumbnailURL: {
        type: String,
        required: [true, "Thumbnail URL is required"],
      },
      location: {
        type: String,
        required: [true, "Location is required"],
      },
      map: {
        lat: {
          type: Number,
          required: [true, "Latitude is required"],
          min: -90,
          max: 90,
        },
        lng: {
          type: Number,
          required: [true, "Longitude is required"],
          min: -180,
          max: 180,
        },
      },
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: [status.PENDING, status.REJECTED, status.APPROVED],
      default: status.PENDING,
    },
    feedback: {
      type: String,
    },
  },
  {timestamps: true}
);

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
