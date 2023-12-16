const { Schema, model } = require("mongoose");
const gender = require("../constants/gender");
const role = require("../constants/role");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
      minLength: [8, "Password must be at least 8 characters"],
      required: true,
    },
    photoURL: {
      type: String,
    },
    phone: {
      type: String,
      // required: true,
    },
    age: {
      type: Number,
      // required: true,
      min: [18, "Age must be at least 18 years"],
    },
    gender: {
      type: String,
      enum: [gender.MALE, gender.FEMALE, gender.OTHERS],
      // required: true,
    },
    nid: {
      type: String, // Assuming National ID is alphanumeric, use String
      minlength: 10,
    },
    role: {
      type: String,
      enum: [role.CUSTOMER, role.MANAGER, role.ADMIN],
      default: role.CUSTOMER,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
