const User = require("../models/UserModel");
const Request = require("../models/RequestModel");
const response = require("../functions/response");

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(response(requests, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500", error.message));
  }
};

const createRequest = async (req, res) => {
  try {
    const { userId, UtrNumber } = req.body;
    const exist = await Request.findOne({ userId });
    if (exist) {
      return res
        .status(400)
        .json(response(null, null, "Request already exist"));
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json(response(null, null, "User not found"));
    }
    const newRequest = {
      userId,
      userName: user.name,
      userEmail: user.email,
      UtrNumber,
    };

    const request = await Request.create(newRequest);
    res.status(200).json(response(request, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500", error.message));
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id);
    if (!request) {
      return res.status(400).json(response(null, null, "Request not found"));
    }
    res.status(200).json(response(request, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500", error.message));
    console.log(error);
    return;
  }
};

const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    if (!requestId) {
      return res.status(400).json(response(null, null, "Request not found"));
    }
    const request = await Request.findByIdAndDelete(requestId);
    res.status(200).json(response(request, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500", error.message));
  }
};

module.exports = { getAllRequests, createRequest, deleteRequest, getById };
