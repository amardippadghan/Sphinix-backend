const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  getAllRequests,
  createRequest,
  deleteRequest,
  getById,
} = require("../controller/RequestController");

const router = express.Router();

router.get("/", verifyToken, getAllRequests);
router.post("/", verifyToken, createRequest);
router.delete("/:id", verifyToken, deleteRequest);
router.get("/:id", verifyToken, getById);

module.exports = router;
