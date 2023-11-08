const gender = require("../../constants/gender");
const role = require("../../constants/role");
const User = require("../../models/User");
const throwError = require("../../utils/throwError");

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("Invalid id", 404);

    const existingUser = await User.findById(id);
    if (!existingUser) throwError("User not found", 404);

    res.json(existingUser);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) throwError("Invalid id", 404);
    if (data?.password) throwError("Password can't be change", 404);
    if (data?.email) throwError("Email can't be change", 404);

    // check validation if->  gender: undefined, role: undefined

    if (data?.role) {
      data.role =
        role[data?.role.toUpperCase()] ||
        throwError("ROLE: please provide correct value", 404);
    }

    if (data?.gender) {
      data.gender =
        gender[data?.gender?.toUpperCase()] ||
        throwError("GENDER: please provide correct value", 404);
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({message: "User not found"});
    }

    // Compare the existing data with the new data
    const dataIsSame =
      JSON.stringify(existingUser.toObject()) ===
      JSON.stringify({...existingUser.toObject(), ...data});

    if (dataIsSame) {
      return res
        .status(400)
        .json({message: "No changes to apply, user data is the same."});
    }

    const updatedUser = await User.findOneAndUpdate({_id: id}, data, {
      new: true,
    });

    if (!updatedUser) throwError("User not found", 404);

    res.json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const userDeleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throwError("Invalid id", 404);

    const isDeleted = await User.deleteOne({_id: id});

    if (!isDeleted.deletedCount) throwError("User not deleted", 404);

    res.json({message: "User deleted successfully", isDeleted});
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const {page = 1, limit = 20, descending = "false"} = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    // Define the sort direction based on the 'descending' query parameter
    const sortDirection = descending === "true" ? -1 : 1;

    const skip = (parsedPage - 1) * parsedLimit;

    // Use Mongoose to query the database with sorting, limiting, and paging
    const users = await User.find()
      .sort({createdAt: sortDirection})
      .skip(skip)
      .limit(parsedLimit);

    if (users.length === 0) {
      throwError("User not found", 404);
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {getUserById, updateUserById, userDeleteById, getUser};
