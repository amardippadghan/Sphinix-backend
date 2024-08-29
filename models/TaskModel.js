const mongoose = require("mongoose")
require("./UserModel")


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        
    },
    status: {
        type: String,
        enum: ["todo", "in progress", "completed"],
        default : "todo"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Task = mongoose.model("Task", taskSchema)


module.exports = Task;


