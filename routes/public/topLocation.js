const Hotel = require("../../models/Hotel");

const router = require("express").Router();
router.get("/", async (req, res, next) => {
  try {
    let location = await Hotel.find();
    const locationCounts = {};

    location.forEach((hotel) => {
      const locationId = hotel._id;
      const name = hotel.address.location;
      const thumbnailURL = hotel.address.thumbnailURL;

      if (locationCounts[name]) {
        locationCounts[name].total_hotel++;
      } else {
        locationCounts[name] = {
          _id: locationId,
          name: name,
          ThumbnailURL: thumbnailURL,
          total_hotel: 1,
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
