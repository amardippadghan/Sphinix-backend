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
  Suscription: {
    type: String,
    required: true,
    default: "FREEMIUM",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
