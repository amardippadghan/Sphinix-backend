const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();
const {
  CreateUser,
  LoginUser,
  getAllUser,
} = require("../controller/UserControl");

router.post("/signup", CreateUser);
router.post("/login", LoginUser);
router.get("/users", verifyToken, getAllUser);

module.exports = router;
