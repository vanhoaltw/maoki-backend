const mongoose = require("mongoose");
const router = require("express").Router();
const SSLCommerzPayment = require("sslcommerz-lts");
const throwError = require("../utils/throwError");
const Payment = require("../models/Payment");
const Room = require("../models/Room");
const store_id = "sslco654e18d87915b";
const store_passwd = "sslco654e18d87915b@ssl";
const is_live = false;
// It's use globally
const TRANSACTION_ID = new mongoose.Types.ObjectId().toString();

//sslcommerz init
router.post("/order", async (req, res, next) => {
  try {
    let data = req.body; //an array

    const email = data[0].email;
    const phoneNumber = data[0].phoneNumber;

    const fetchPrices = data.map(async (item) => {
      const room = await Room.findById(item.roomId);
      if (room && room.roomInfo && room.roomInfo.discountedPrice) {
        return room.roomInfo.discountedPrice;
      }
      return 0;
    });

    const resolvedPrices = await Promise.all(fetchPrices);
    const totalAmount = resolvedPrices.reduce((acc, price) => acc + price, 0);

    // remove email, phoneNumber
    data = data.map(({email, phoneNumber, ...rest}) => rest);

    const sslData = {
      tran_id: TRANSACTION_ID, // use unique tran_id for each api call
      total_amount: totalAmount,
      currency: "BDT",
      success_url: `${process.env.ROOT_BACKEND}/payment/success`,
      fail_url: `${process.env.ROOT_BACKEND}/payment/fail`,
      cancel_url: `${process.env.ROOT_BACKEND}/payment/cancel`,
      ipn_url: `${process.env.ROOT_BACKEND}/payment/ipn`,
      shipping_method: "Online",
      product_name: "Room Booking.",
      product_category: "Room",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: phoneNumber,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const paymentData = new Payment({
      transactionId: TRANSACTION_ID,
      email: email,
      rooms: data,
      phoneNumber: phoneNumber,
      totalAmount: totalAmount,
    });

    for (const room of data) {
      await Room.findByIdAndUpdate(room.roomId, {
        $inc: {bookedCount: 1},
        "availability.checkIn": room.checkIn,
        "availability.checkOut": room.checkOut,
        "availability.isBlocked": true,
      });
    }

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(sslData);
    if (!apiResponse) throwError("Couldn't initialize SSLCommerzPayment");

    const result = await paymentData.save();

    if (result) {
      res.json(apiResponse.GatewayPageURL);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/success", async (req, res, next) => {
  try {
    const data = req.body;

    const existingPayment = await Payment.findOne({
      transactionId: data?.tran_id,
    }).exec();

    return res.json({data, existingPayment});

    if (!existingPayment) {
      throwError("Payment not found" + JSON.stringify({data, existingPayment}));
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      {transactionId: data?.tran_id},
      {
        $set: {
          status: data?.status,
          cardType: data?.card_type,
        },
      },
      {new: true}
    );
    console.log(updatedPayment);

    if (updatedPayment && updatedPayment.status != "VALID") {
      await Payment.findOneAndDelete({transactionId: data?.tran_id});
      throwError("Payment not success");
    }

    res.redirect(
      `${process.env.ROOT_FRONTEND}/payment/success/${data?.tran_id}`
    );
  } catch (error) {
    next(error);
  }
});

router.get("/success/:transactionId", async (req, res, next) => {
  try {
    const transactionId = req.params.transactionId;
    if (!transactionId) throwError("transactionId not found", 404);

    const payment = await Payment.findOne({
      transactionId: transactionId,
    }).exec();

    if (!payment) throwError("payment not found", 404);

    res.json(payment);
  } catch (error) {
    next(error);
  }
});

const deletePaymentAndRedirect = async (req, res, next, status) => {
  const data = req.body;
  try {
    const payment = await Payment.findOne({
      transactionId: data?.tran_id,
    }).exec();

    if (!payment) {
      throwError(
        "Payment not found for the provided transactionId " +
          JSON.stringify(data) +
          JSON.stringify(payment),
        404
      );
    } else {
      const {rooms} = payment;

      for (const room of rooms) {
        await Room.findByIdAndUpdate(room.roomId, {
          $inc: {bookedCount: -1},
          "availability.checkIn": null,
          "availability.checkOut": null,
          "availability.isBlocked": false,
        });
      }

      await Payment.findOneAndDelete({transactionId: data?.tran_id});
    }

    switch (status) {
      case "fail":
        res.redirect(`${process.env.ROOT_FRONTEND}/payment/fail`);
        break;
      case "cancel":
        res.redirect(`${process.env.ROOT_FRONTEND}/payment/cancel`);
        break;
      case "ipn":
        res.redirect(`${process.env.ROOT_FRONTEND}/payment/fail`);
        break;

      default:
        res.redirect(`${process.env.ROOT_FRONTEND}/payment/fail`);
        break;
    }
  } catch (error) {
    next(error);
  }
};

router.post("/fail", async (req, res, next) => {
  await deletePaymentAndRedirect(req, res, next, "fail");
});

router.post("/cancel", async (req, res, next) => {
  await deletePaymentAndRedirect(req, res, next, "cancel");
});

router.post("/ipn", async (req, res, next) => {
  res.json("ipn");
  // await deletePaymentAndRedirect(req, res, next, "ipn");
});

module.exports = router;
