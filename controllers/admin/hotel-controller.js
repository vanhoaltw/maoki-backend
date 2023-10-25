const status = require("../../constants/status");
const throwError = require("../../utils/throwError");
const Hotel = require("../../models/Hotel");

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

    const updatedStatus = await Hotel.findOneAndUpdate({_id: id}, updatedDoc, {
      new: true,
    });

    if (!updatedStatus) throwError("Status not updated", 404);

    res.json({message: "Status updated successfully", hotel: updatedStatus});
  } catch (error) {
    next(error);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      throwError("Hotel not found", 404);
    }
    res.json(hotel);
  } catch (error) {
    next(error);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.find();

    if (hotel.length == 0) {
      throwError("Hotel not found", 404);
    }
    res.json(hotel);
  } catch (error) {
    next(error);
  }
};

module.exports = {updateStatus, getHotelById, getHotel};
