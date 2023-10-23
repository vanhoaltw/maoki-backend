const {Schema, model} = require("mongoose");

const roomSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel ID is required"],
  },
  facilities: {
    type: [String],
    default: [],
  },
  thumbnails: {
    type: [String],
    default: [],
  },
  bookedCount: {
    type: Number,
    min: 0,
  },
  availability: {
    startDate: {type: Date, default: null},
    endDate: {type: Date, default: null},
    isBlocked: {type: Boolean, default: false},
  },
  capacity: {
    adult: {
      type: Number,
      required: [true, "Adult capacity is required"],
      min: [0, "Adult capacity cannot be negative"],
    },
    child: {
      type: Number,
      required: [true, "Child capacity is required"],
      min: [-180, "Child capacity should be between -180 and 180"],
      max: [180, "Child capacity should be between -180 and 180"],
    },
  },
  roomInfo: {
    roomSize: {type: String},
    bedType: {type: String},
    view: {type: String},
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
    },
    discountedPrice: {type: Number},
    additionalInfo: {type: String},
  },
});

const Room = model("Room", roomSchema);

module.exports = Room;
