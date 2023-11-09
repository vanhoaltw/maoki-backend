const router = require("express").Router();
const Hotel = require("../../models/Hotel");

router.get("/", async (req, res, next) => {
  try {
    let location = await Hotel.find();
    const locationCounts = {};

    location.forEach((hotel) => {
      const _id = hotel._id;
      const location = hotel.address.location;
      const thumbnail = hotel.address.thumbnailURL;

      if (locationCounts[location]) {
        locationCounts[location].totalHotel++;
      } else {
        locationCounts[location] = {
          _id,
          location,
          thumbnail,
          totalHotel: 1,
        };
      }
    });

    const locationData = Object.values(locationCounts);
    res.json(locationData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
