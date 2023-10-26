require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const dbName = "hotel-haven";
// const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p7e2eey.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const URI = `mongodb://127.0.0.1:27017/${dbName}`;

const connectDB = require("./config/db");
const routes = require("./routes");

app.use(cors());
app.use(express.json());

// all routes included
app.use(routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json({message: err.message || "Something went wrong!"});
});

// Database connection URL / String
connectDB(URI)
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
