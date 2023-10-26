const UserGoogleAccount = require("../../models/UserGoogleAccount");
const isFieldsRequired = require("../../utils/isFieldsRequired");
const throwError = require("../../utils/throwError");

const continueWithGoogle = async (req, res, next) => {
  const data = req.body;

  try {
    const isRequired = isFieldsRequired(data, ["name", "email", "uid"]);

    // Data validation
    if (!isRequired) {
      throwError("All fields are required", 400);
    }

    let user = await UserGoogleAccount.findOne({email: data.email});

    if (!user) {
      user = new UserGoogleAccount(data);
      await user.save();
    }
    delete user._doc.uid;

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = continueWithGoogle;
