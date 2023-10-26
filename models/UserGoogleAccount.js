const {Schema, model} = require("mongoose");
const role = require("../constants/role");

const userGoogleAccountSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    role: {
      type: String,
      enum: [role.CUSTOMER, role.MANAGER, role.ADMIN],
      default: role.CUSTOMER,
    },
  },
  {timestamps: true}
);

const UserGoogleAccount = model("GoogleAccount", userGoogleAccountSchema);

module.exports = UserGoogleAccount;
