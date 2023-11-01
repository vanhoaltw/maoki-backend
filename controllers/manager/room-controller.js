const status = require("../../constants/status");
const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const isArrayEmpty = require("../../utils/isArrayEmpty");
const isFieldsRequired = require("../../utils/isFieldsRequired");
const isObjectEmpty = require("../../utils/isObjectEmpty");
const throwError = require("../../utils/throwError");

const getById = (req, res, next) => {
  try {
    res.json("room getById");
  } catch (error) {
    next(error);
  }
};

const updateById = (req, res, next) => {
  try {
    res.json("room updateById");
  } catch (error) {
    next(error);
  }
};

const deleteById = (req, res, next) => {
  try {
    res.json("room deleteById");
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const existingHotel = await Hotel.findOne({
      managerId: req.user._id,
    }).exec();

    if (!existingHotel) {
      throwError("Hotel not exist!");
    }

    const rooms = await Room.find({hotelId: existingHotel._id});

    if (!rooms) {
      throwError("Room not found!");
    }

    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const data = req.body;
    const isRequired = isFieldsRequired(data, [
      "title",
      "facilities",
      "thumbnails",
      "capacity",
      "roomInfo",
    ]);

    if (!isRequired) {
      throwError("fields is required", 404);
    }

    if (isArrayEmpty(data.facilities)) {
      throwError("facilities is required", 404);
    }

    if (isArrayEmpty(data.thumbnails)) {
      throwError("thumbnails is required", 404);
    }

    if (isObjectEmpty(data.capacity)) {
      throwError("capacity is required", 404);
    }

    if (isObjectEmpty(data.roomInfo)) {
      throwError("Room Info is required", 404);
    }

    const isRoomRequired = isFieldsRequired(data.roomInfo, [
      "roomSize",
      "regularPrice",
      "discountedPrice",
      "view",
      "bedType",
      "additionalInfo",
    ]);

    if (!isRoomRequired) {
      throwError("Room Info is required", 404);
    }

    const existingHotel = await Hotel.findOne({
      managerId: req.user._id,
    }).exec();

    if (!existingHotel) {
      throwError("Hotel not exist!");
    }

    if (existingHotel.status !== status.APPROVED) {
      throwError("Hotel is not APPROVED", 404);
    }

    data.hotelId = existingHotel._id;

    if (existingHotel._doc.availableRoom <= existingHotel._doc.addedRoom) {
      throwError("Room not available", 404);
    }

    const newRoom = new Room(data);
    await newRoom.save();

    await Hotel.findOneAndUpdate(
      {managerId: req.user._id},
      {$inc: {addedRoom: 1}}
    );

    res.json({message: "Room created successfully"});
  } catch (error) {
    next(error);
  }
};

module.exports = {getById, updateById, deleteById, get, post};
