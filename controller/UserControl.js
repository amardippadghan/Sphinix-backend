const User = require("../models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const response = require("../functions/response");

const CreateUser = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const userExists = await User.findOne({ email });
    const userNumber = await User.findOne({ number });
    if (userExists) {
      return res.status(400).json(response(null, null, "user already exist"));
    }
    if (userNumber) {
      return res.status(400).json(response(null, null, "user already exist"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      number,
      password: hashedPassword,
    });

    res.status(201).json(response(null, "user has been crated", null));
  } catch (error) {
    res.status(500).json(response(null, null, error.message));
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(response(null, null, "User not found"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(response(null, null, "Invalid Password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "3h",
    });
    const sendUser = {
      name: user.name,
      email: user.email,
      number: user.number,
    };
    res
      .status(200)
      .json(
        response({ user: sendUser, token: token }, "login Succesfully", null)
      );
  } catch (error) {
    res.status(500).json(response(null, null, error.message));
  }
};
const testSub = async (req, res) => {
  try {
    res
      .status(200)
      .json(response(null, "subcrition is working , success", null));
  } catch (error) {
    res.status(500).json(response(null, null, error.message));
  }
};

const UpdateUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (!UserId) {
      return res.status(400).json(response(null, null, "User not found"));
    }
    if (req.body.email) {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json(response(null, null, "user already exist"));
      }
    }
    const user = await User.findByIdAndUpdate(UserId, req.body, {
      new: true,
    });
    res.status(200).json(response(user, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500", error.message));
  }
};

const DeleteUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (!UserId) {
      return res.status(400).json(response(null, null, "User not found"));
    }
    const user = await User.findByIdAndDelete(UserId);
    res.status(200).json(response(user, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500", error.message));
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(response(users, null, null));
    console.log(users);
  } catch (error) {
    res.status(500).json(response(null, null, error.message));
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  getAllUser,
  testSub,
  DeleteUser,
  UpdateUser,
};
