const router = require("express").Router();
const Hotel = require("../../models/Hotel");
const throwError = require("../../utils/throwError");

router.put("/status/:id", async (req, res, next) => {
  try {
    res.json("status id");
  } catch (error) {
    next(error);
  }
});

router.get("/status", async (req, res, next) => {
  try {
    res.json("status");
  } catch (error) {
    next(error);
  }
});

router.get("/review", async (req, res, next) => {
  try {
    res.json("review");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/room/:id", async (req, res, next) => {
  try {
    res.json("hotelId room id");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/room", async (req, res, next) => {
  try {
    res.json("hotelId room");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json("hotelId");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const hotel = await Hotel.find();

    if (hotel.length == 0) {
      throwError("Hotel not found", 404);
    }
    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
