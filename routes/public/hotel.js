const Hotel = require("../../models/Hotel");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    let hotel = await Hotel.find().skip(skip).limit(limit);

    if (!hotel) throwError("Hotel not found!", 404);

    hotel = hotel.map((singleHotel) => {
      return {
        _id: singleHotel._id,
        name: singleHotel.name,
        location: singleHotel.address.location,
        photoURL: singleHotel.photoURL,
        description: singleHotel.description.slice(0, 60),
        rating: 0, // TODO: will be updated
      };
    });

    res.json(hotel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
