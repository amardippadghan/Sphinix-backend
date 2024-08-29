const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const {CreateTask , getTask , updateTask , deleteTask} = require("../controller/TaskController")


router.post("/createTask",verifyToken,CreateTask)
router.get("/getTask", getTask)
router.patch("/updateTask", verifyToken, updateTask)
router.delete("/deleteTask", verifyToken, deleteTask)




module.exports = router ;