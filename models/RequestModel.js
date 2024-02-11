const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  UtrNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
    default: "100",
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
