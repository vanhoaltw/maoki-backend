const mongoose = require("mongoose");

/**
 *
 * @param {dbConnectionStr} connectionString
 * @returns promise
 */

function connectDB(connectionString) {
  return mongoose.connect(connectionString);
}

module.exports = connectDB;
