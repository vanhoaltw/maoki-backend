const Hotel = require("../models/Hotel");
const isFieldsRequired = require("../utils/isFieldsRequired");
const throwError = require("../utils/throwError");

const router = require("express").Router();

router.get("/hotel", async (req, res, next) => {
  try {
    const result = await Hotel.findOne();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/hotel", async (req, res, next) => {
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

    const existingHotel = await Hotel.findOne();

    if (existingHotel) {
      throwError("Hotel already exists", 404);
    }

    const newHotel = new Hotel(data);

    const result = await newHotel.save();

    res.json({message: "Hotel saved successfully", hotel: result});
  } catch (error) {
    next(error);
  }
});

router.put("/hotel", (req, res, next) => {
  try {
    const data = req.body;
  } catch (error) {
    next(error);
  }
});

router.delete("/hotel", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.end("Hello");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
