const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  hasSubscribe: {
    type: Boolean,
    default: false,
  },
  licenseId: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
