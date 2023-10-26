const jwt = require("jsonwebtoken");
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
    const payload = {
      name: user._doc?.name,
      email: user._doc?.email,
      _id: user._doc?._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);

    delete user._doc.uid;

    res.json({googleToken: token, user});
  } catch (error) {
    next(error);
  }
};

module.exports = continueWithGoogle;
