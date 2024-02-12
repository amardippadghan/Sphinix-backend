const subscription = require("../models/SubscriptionModel");
const User = require("../models/UserModel");
require("dotenv").config();
const { generateLicense } = require("../functions/generateLicense");
const response = require("../functions/response");
const RequestModel = require("../models/RequestModel");

const UserLicense = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user.hasSubscribe === true) {
      return res
        .status(400)
        .json(
          response(
            null,
            "user Has been already has Subscription ",
            "status : 400"
          )
        );
    }
    const license = generateLicense(userId);
    const sub = await subscription.create({
      license: license,
    });

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        hasSubscribe: true,
        licenseId: sub._id,
      },
      { new: true }
    );
    const editRequest = await RequestModel.findOneAndUpdate(
      { userId },
      {
        status: "approve",
      },
      { new: true }
    );

    res
      .status(200)
      .json(
        response(
          { updatedUser: updateUser, subscription: sub, request: editRequest },
          "success",
          null
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(response(null, "status : 500", error.message));
  }
};
const getByIdLisense = async (req, res) => {
  try {
    const id = req.params.id;
    const license = await subscription.findById(id);
    res.status(200).json(response(license, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500", error.message));
    console.log(error);
    return;
  }
};

const getAllLicense = async (req, res) => {
  try {
    const licenses = await subscription.find();
    res.status(200).json(response(licenses, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500 ", error.message));
  }
};
module.exports = { UserLicense, getAllLicense, getByIdLisense };
