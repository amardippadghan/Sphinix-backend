const express = require("express");
const verifyToken = require("../middleware/auth");
const validate = require("../middleware/validate");
const router = express.Router();
const {
  CreateUser,
  LoginUser,
  getAllUser,
  testSub,
  validateUser,
  UpdateUser,
  DeleteUser,
  getUserById,
} = require("../controller/UserControl");

const {
  getAllLicense,
  UserLicense,
  getByIdLisense,
} = require("../controller/SubcriptionControl");

//user routes
router.post("/signup", CreateUser);
router.post("/login", LoginUser);
router.get("/users", getAllUser);
router.patch("/user/:id",verifyToken, UpdateUser);
router.delete("/user/:id", verifyToken,DeleteUser);
router.get("/verify-token", verifyToken, validateUser);
router.get("/user/:id", verifyToken, getUserById);

//lisense routes
router.get("/license", getAllLicense);
router.post("/license/:userId", UserLicense);
router.get("/sub/:userId", verifyToken, validate, testSub);
router.get("/subcription/:id", verifyToken, getByIdLisense);


module.exports = router;
