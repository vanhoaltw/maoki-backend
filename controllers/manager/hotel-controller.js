const Hotel = require("../../models/Hotel");
const isFieldsRequired = require("../../utils/isFieldsRequired");
const throwError = require("../../utils/throwError");

const getHotel = async (req, res, next) => {
  try {
    const result = await Hotel.findOne({managerId: req.user._id});

    if (!result) throwError("Couldn't find hotel", 404);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postHotel = async (req, res, next) => {
  try {
    const data = req.body;
    const isRequired = isFieldsRequired(data, [
      "name",
      "photoURL",
      "description",
      "availableRoom",
      "address",
    ]);

    if (!isRequired) {
      throwError("All fields is required", 404);
    }

    data.managerId = req.user._id;

    const existingHotel = await Hotel.findOne({managerId: req.user._id});

    if (existingHotel) {
      throwError("Hotel already exists", 409);
    }

    const newHotel = new Hotel(data);

    const result = await newHotel.save();

    res.json({message: "Hotel saved successfully", hotel: result});
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const data = req.body;

    if (data.length <= 0) throwError("Please provide a updated hotel", 404);

    const existingHotel = await Hotel.findOne({managerId: req.user._id});

    if (!existingHotel) {
      throwError("Hotel is not found", 404);
    }

    const updatedHotel = await Hotel.findOneAndUpdate(
      {_id: existingHotel._id, managerId: req.user._id},
      data,
      {
        new: true,
      }
    );

    if (!updatedHotel) throwError("User not found", 404);

    res.json({
      message: "Hotel updated successfully",
      updatedHotel,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const existingHotel = await Hotel.findOne({managerId: req.user._id});

    if (!existingHotel) {
      throwError("Couldn't find hotel", 404);
    }

    const deleteHotel = await Hotel.deleteOne({
      _id: existingHotel._id,
      managerId: req.user._id,
    });

    if (!deleteHotel.deletedCount) {
      throwError("Couldn't deleted Hotel", 404);
    }

    res.json({
      message: "Hotel delete successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {getHotel, postHotel, updateHotel, deleteHotel};
