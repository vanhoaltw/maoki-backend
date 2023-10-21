require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const connectDB = require("./config/db");
const routes = require("./routes");

app.use(cors());
app.use(express.json());

// all routes included
app.use(routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({message: "Something went wrong!"});
});

// Database connection URL / String
connectDB("mongodb://localhost:27017/hotel-haven")
  .then(() => {
    console.log("Database connection established!");

    // when mongodb connection is established the app will run.
    app.listen(port, () => {
      console.log(`app listening on port ${port} http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
