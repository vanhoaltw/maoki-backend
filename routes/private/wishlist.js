const router = require("express").Router();
const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const Wishlist = require("../../models/Wishlist");
const throwError = require("../../utils/throwError");

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      throwError("id must be provide");
    }

    const existingWishlist = await Wishlist.findOne({
      userId: req.user._id,
      $or: [{roomId: id}, {_id: id}],
    });

    if (!existingWishlist) throwError("Wishlist not found");

    const wishlist = await Wishlist.findByIdAndDelete(existingWishlist._id);

    if (!wishlist) throwError("Wishlist not delete");

    res.json({message: "Wishlist deleted successfully"});
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let wishlist = await Wishlist.find({userId: req.user._id});

    if (!wishlist) throwError("wishlist not found", 404);

    wishlist = await Promise.all(
      wishlist.map(async (singleWishlist) => {
        const room = await Room.findById(singleWishlist.roomId);

        return {
          _id: singleWishlist._id,
          roomId: singleWishlist.roomId,
          roomTitle: singleWishlist._id
            ? (await Room.findById(singleWishlist.roomId)).title
            : "",
          hotelName: room.hotelId
            ? (await Hotel.findById(room.hotelId)).name
            : "",
        };
      })
    );

    res.json(wishlist);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const roomId = req.body.roomId;

    if (!roomId) {
      throwError("roomId must be provide", 404);
    }

    const existingWishlist = await Wishlist.findOne({
      roomId,
      userId: req.user._id,
    });

    if (existingWishlist) {
      throwError("Wishlist already saved", 409);
    }

    const newWishlist = new Wishlist({roomId, userId: req.user._id});
    await newWishlist.save();

    res.json({message: "Wishlist saved successfully"});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
