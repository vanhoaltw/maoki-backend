const {Schema, model} = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression for basic email validation
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18 years"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    nid: {
      type: String, // Assuming National ID is alphanumeric, use String
      required: true,
      minlength: 10,
    },
    role: {
      type: String,
      enum: ["GENERAL", "MODERATE", "ADMIN"],
      default: "GENERAL",
    },
  },
  {timestamps: true}
);

const User = model("User", userSchema);

module.exports = User;
