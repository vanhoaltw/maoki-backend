const router = require("express").Router();

const userRoutes = require("./user");
const hotelRoutes = require("./hotel");
const User = require("../../models/User");
const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");

router.use("/user", userRoutes);
router.use("/hotel", hotelRoutes);

router.get("/", async (req, res, next) => {
  try {
    const countUsers = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: {$sum: 1},
        },
      },
    ]);

    const totalUsers = {
      USERS: 0,
      CUSTOMER: 0,
      ADMIN: 0,
      MANAGER: 0,
    };

    countUsers.forEach((count) => {
      const role = count._id;
      totalUsers[role] = count.count;
      totalUsers["USERS"] = totalUsers.USERS + count.count;
    });

    const countHotels = await Hotel.aggregate([
      {
        $group: {
          _id: "$status",
          count: {$sum: 1},
        },
      },
    ]);

    const totalHotels = {
      APPROVED: 0,
      PENDING: 0,
      REJECTED: 0,
    };

    countHotels.forEach((count) => {
      const status = count._id;
      totalHotels[status] = count.count;
    });

    const totalRooms = await Room.countDocuments();

    return res.json({totalUsers, totalHotels, totalRooms});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
