const Hotel = require("../../models/Hotel");
const throwError = require("../../utils/throwError");
const bcrypt = require("bcrypt");

const hotelRegisterController = async (req, res, next) => {
  const data = req.body;
  const requiredFields = ["name", "email", "password", "phone", "photoURL"];

  try {
    // check the fields is required
    const isRequired = requiredFields.some((field) => !data[field]);

    // data validation
    if (isRequired) {
      throwError("All fields are required", 400);
    }

    if (data.password.length < 8) {
      throwError("Password must be at least 8 characters", 400);
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the number of salt rounds

    data.password = hashedPassword;

    // Check if the email is already in use
    const existingHotel = await Hotel.findOne({
      $or: [{email: data.email}, {phone: data.phone}],
    });

    if (existingHotel?.email === data.email) {
      throwError("Email is already in use", 409);
    }

    if (existingHotel?.phone === data.phone) {
      throwError("Phone Number is already in use", 409);
    }

    const newHotel = await new Hotel({...data});

    newHotel.save();

    res.json({message: "Account created successfully", hotel: newHotel});
  } catch (error) {
    next(error);
  }
};
module.exports = hotelRegisterController;
