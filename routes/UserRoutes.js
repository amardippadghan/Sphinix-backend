const express = require("express");
const verifyToken = require("../middleware/auth");
const validate = require("../middleware/validate");
const router = express.Router();
const {
  CreateUser,
  LoginUser,
  getAllUser,
  testSub,
} = require("../controller/UserControl");

const {
  getAllLicense,
  UserLicense,
} = require("../controller/SubcriptionControl");

router.post("/signup", CreateUser);
router.post("/login", LoginUser);
router.get("/users", verifyToken, getAllUser);
router.get("/license", getAllLicense);
router.post("/license/:userId", UserLicense);
router.get("/sub/:userId", validate, testSub);

module.exports = router;
