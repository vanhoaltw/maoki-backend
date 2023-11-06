const router = require("express").Router();
const Wishlist = require("../../models/Wishlist");
const throwError = require("../../utils/throwError");

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      throwError("id must be provide");
    }

    const existingWishlist = await Wishlist.findOne({
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
    const wishlist = await Wishlist.find({userId: req.user._id});

    if (!wishlist) throwError("wishlist not found", 404);

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

    const existingWishlist = await Wishlist.findOne({roomId});

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
