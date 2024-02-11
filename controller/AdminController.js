const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");
const response = require("../functions/response");

require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({ username, password: hashedPassword });   
    res.status(201).json(response(admin, "Admin has been created", null));
  } catch (error) {
    res.status(500).json(response(null, null, error.message));
  }
};
const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json(response(admin, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "status : 500 ", error.message));
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json(response(null, "Admin not found", null));
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json(response(null, "Invalid password", null));
    }
    const newAdmin = {
      id: admin._id,
      username: admin.username,
    };
    const token = jwt.sign({ id: admin._id }, process.env.JWT_TOKEN, {
      expiresIn: "3h",
    });
    res
      .status(200)
      .json(
        response(
          { admin: newAdmin, token: token },
          "success , Login succesfully",
          null
        )
      );
  } catch (error) {
    res.status(500).json(response(null, null, error.message));
  }
};

module.exports = { register, login, getAdmin };
