const status = require("../../constants/status");
const throwError = require("../../utils/throwError");
const Hotel = require("../../models/Hotel");
const User = require("../../models/User");
const Room = require("../../models/Room");

const updateStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const dataStatus =
      status[data?.status.toUpperCase()] || throwError("check status", 400);

    const updatedDoc = {
      $set: {
        // Update the property
      },
      $unset: {
        // Delete the property
      },
    };

    if (!data.status) {
      throwError("Status must be required");
    }

    updatedDoc.$set.status = dataStatus;

    if (dataStatus === status.REJECTED) {
      if (!data.feedback) throwError("feedback is empty");
      updatedDoc.$set.feedback = data.feedback;
    } else {
      updatedDoc.$unset.feedback = "";
    }

    data.status = dataStatus;

    const existingHotel = await Hotel.findById(id);

    if (!existingHotel) {
      throwError("Hotel not found", 404);
    }

    if (existingHotel.status === dataStatus) throwError("Already in use", 404);

    const updatedStatus = await Hotel.findOneAndUpdate(
      { _id: id },
      updatedDoc,
      {
        new: true,
      }
    );

    if (!updatedStatus) throwError("Status not updated", 404);

    res.json({ message: "Status updated successfully", hotel: updatedStatus });
  } catch (error) {
    next(error);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let hotel = await Hotel.findById(id);
    let manager = await User.findById(hotel.managerId);
    manager = {
      managerName: manager.name,
      email: manager.email,
      managerPhotoURL: manager.photoURL,
    };

    if (!hotel) {
      throwError("Hotel not found", 404);
    }
    const room = await Room.find({ hotelId: hotel._id });
    hotel = { ...hotel._doc, ...manager };

    res.json({ hotel, room });
  } catch (error) {
    next(error);
  }
};
const getHotel = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().lean();

    const hotelPromises = hotels.map(async (singleHotel) => {
      try {
        const manager = await User.findById(singleHotel.managerId).lean();
        const addedRoomCount = await Room.countDocuments({
          hotelId: singleHotel._id,
        });

        return {
          _id: singleHotel._id,
          name: singleHotel.name,
          photoURL: singleHotel.photoURL,
          availableRoom: singleHotel.availableRoom,
          addedRoom: addedRoomCount,
          status: singleHotel.status,
          email: manager.email,
        };
      } catch (error) {
        next(error);
      }
    });

    const hotelData = await Promise.all(hotelPromises);

    if (hotelData.length === 0) {
      throwError("Hotel not found", 404);
    }

    res.json(hotelData);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateStatus, getHotelById, getHotel };
