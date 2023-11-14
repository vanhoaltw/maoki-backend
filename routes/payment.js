const mongoose = require("mongoose");
const router = require("express").Router();
const SSLCommerzPayment = require("sslcommerz-lts");
const throwError = require("../utils/throwError");
const Payment = require("../models/Payment");
const store_id = "sslco654e18d87915b";
const store_passwd = "sslco654e18d87915b@ssl";
const is_live = false;
// It's use globally
const TRANSACTION_ID = new mongoose.Types.ObjectId().toString();

//sslcommerz init
router.post("/order", async (req, res) => {
  let data = req.body; //an array

  const email = data[0].email;
  const phoneNumber = data[0].phoneNumber;

  // remove email, phoneNumber
  data = data.map(({email, phoneNumber, ...rest}) => rest);

  const sslData = {
    tran_id: TRANSACTION_ID, // use unique tran_id for each api call
    total_amount: 100,
    currency: "BDT",
    success_url: "http://localhost:3000/payment/success",
    fail_url: "http://localhost:3000/payment/fail",
    cancel_url: "http://localhost:3000/payment/cancel",
    ipn_url: "http://localhost:3000/payment/ipn",
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
    totalAmount: 500,
  });

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const apiResponse = await sslcz.init(sslData);
  if (!apiResponse) throwError("Couldn't initialize SSLCommerzPayment");

  paymentData.save();

  res.json(apiResponse.GatewayPageURL);
});

router.post("/success", async (req, res) => {
  const data = req.body;

  const existingPayment = await Payment.findOne({
    transactionId: data.tran_id,
  }).exec();

  if (!existingPayment) {
    await Payment.findOneAndDelete({transactionId: tran_id});
    throwError("Payment not found");
  }

  const updatedPayment = await Payment.findOneAndUpdate(
    {transactionId: data.tran_id},
    {
      $set: {
        status: data.status,
        cardType: data.card_type,
      },
    },
    {new: true}
  );

  if (updatedPayment.status != "VALID") {
    await Payment.findOneAndDelete({transactionId: data.tran_id});
    throwError("Payment not success");
  }

  res.redirect(`${process.env.ROOT_FRONTEND}/payment/success`);
});

const deletePaymentAndRedirect = async (req, res, next, status) => {
  const {tran_id} = req.body;
  try {
    await Payment.findOneAndDelete({transactionId: tran_id});

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
  await deletePaymentAndRedirect(req, res, next, "ipn");
});

module.exports = router;
