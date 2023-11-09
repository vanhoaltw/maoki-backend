const Hotel = require("../../models/Hotel");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    let location = await Hotel.find();

    location = location.map((singleLocation) => {
      return {
        _id: singleLocation._id,
        name: singleLocation.address.location,
        thumbnail: singleLocation.address.thumbnailURL,
      };
    });

    res.json(location);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
