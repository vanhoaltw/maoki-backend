const Hotel = require("../../models/Hotel");
const throwError = require("../../utils/throwError");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    let hotel = await Hotel.find();
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
