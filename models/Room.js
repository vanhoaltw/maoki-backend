const {Schema, model} = require("mongoose");

const roomSchema = new Schema({
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel ID is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  facilities: {
    type: [String],
    default: [],
    required: [true, "Facilities is required"],
  },
  thumbnails: {
    type: [String],
    default: [],
    required: [true, "Thumbnail is required"],
  },
  bookedCount: {
    type: Number,
    min: 0,
  },
  availability: {
    checkIn: {type: Date, default: null},
    checkOut: {type: Date, default: null},
    isBlocked: {type: Boolean, default: false},
  },
  capacity: {
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
  roomInfo: {
    roomSize: {type: String, required: [true, "Room size is required"]},
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Discounted price is required"],
    },
    bedType: {type: String},
    view: {type: String},
    additionalInfo: {type: String},
  },
  bookedCount: {type: Number},
});

const Room = model("Room", roomSchema);

module.exports = Room;
