const express = require("express");
const router = express.Router();
const { register, login, getAdmin } = require("../controller/AdminController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, getAdmin);

module.exports = router;
