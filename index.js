require("dotenv").config();
const { roomsAvailabilityChecking } = require("./cron-jobs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const connectDB = require("./config/db");
const routes = require("./routes");
const { env } = require("./config/env");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes included
app.use(routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong!" });
});

// Database connection URL / String
connectDB(env.mongoUri)
  .then(() => {
    console.log("Database connection established!");

    // every time checking rooms Availability and run every 5mins
    roomsAvailabilityChecking.start();

    // when mongodb connection is established the app will run.
    app.listen(port, () => {
      console.log(`app listening on port ${port} http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
