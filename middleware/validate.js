const {
  generateLicense,
  validateLicense,
} = require("../functions/generateLicense");

const User = require("../models/UserModel");
const subscription = require("../models/SubscriptionModel");
const response = require("../functions/response");

const validate = async (req, res, next) => {
  const userId = req.params.userId;
  console.log("userId", userId);

  const user = await User.findById(userId);
  console.log("user", user);

  if (!user) {
    return res
      .status(400)
      .json(response(null, "user not found , please signup", "status : 400"));
  }
  if (user.hasSubscribe === false) {
    return res
      .status(400)
      .json(
        response(
          null,
          "user Has not been Subscribed , please subscribe",
          "status : 400"
        )
      );
  }

  const sub = await subscription.findById(user.licenseId);
  const enddate = new Date(sub.endDate);
  const today = new Date();
  console.log("dateVerify ", enddate < today);

  if (enddate < today) {
    return res
      .status(400)
      .json(
        response(
          null,
          "Subscription Expired , please Renew it ",
          "status : 400"
        )
      );
  }
  console.log("sub", sub);

  const verify = validateLicense(userId, sub.license);
  console.log("verify", verify);
  if (!verify) {
    res.status(400).json(response(null, "Invalid License", "status : 400"));
  }
  next();
};

module.exports = validate;
