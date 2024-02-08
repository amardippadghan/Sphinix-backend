const express = require("express");
const verifyToken = require("../middleware/auth");
const validate = require("../middleware/validate");
const router = express.Router();
const {
  CreateUser,
  LoginUser,
  getAllUser,
  testSub,
  UpdateUser,
  DeleteUser,
} = require("../controller/UserControl");

const {
  getAllLicense,
  UserLicense,
} = require("../controller/SubcriptionControl");

//user routes
router.post("/signup", CreateUser);
router.post("/login", LoginUser);
router.get("/users", verifyToken, getAllUser);
router.patch("/user/:id", verifyToken, UpdateUser);
router.delete("/user/:id", verifyToken, DeleteUser);

//lisense routes
router.get("/license", getAllLicense);
router.post("/license/:userId", UserLicense);
router.get("/sub/:userId", verifyToken, validate, testSub);

module.exports = router;
