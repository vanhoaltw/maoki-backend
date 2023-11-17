const Hotel = require("../../models/Hotel");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const hotelCounts = await Hotel.aggregate([
      {
        $group: {
          _id: "$address.location",
          count: {$sum: 1},
        },
      },
    ]);

    const locationCounts = {};
    hotelCounts.forEach((item) => {
      locationCounts[item._id] = item.count;
    });

    res.json(locationCounts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
