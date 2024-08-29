const response = require("../functions/response");
const taskModel = require("../models/TaskModel");



const CreateTask = async (req, res )=>{
    try {
        const payload = req.body;
        if(!payload.user){
            return res.status(400).json(response(null, "user is required", null))
        }
        const task = await taskModel.create(payload);
        res.status(201).json(response(task, "task created successfully", null))

        
        
    } catch (error) {
        res.status(500).json(response(null, "status : 500 ", error.message));
        
    }
}


const getTask = async (req , res ) =>{
    try {
        const filter = {}
        if(req.query.user){
            filter.user = req.query.user
        }
        const task = await taskModel.find(filter);
        res.status(200).json(response(task, "success", null))
        
    } catch (error) {
        res.status(500).json(response(null, "status : 500 ", error.message));
        
    }
}


const updateTask = async (req, res) =>{
    try {
        const id = req.body
        const payload = req.body;
        const task = await taskModel.findByIdAndUpdate(id, payload, {new : true});
        res.status(200).json(response(task, "task updated successfully", null))

    } catch (error) {
        res.status(500).json(response(null, "status : 500 ", error.message));

    }
}


const deleteTask = async (req, res) =>{
    try {
        const id = req.body
        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json(response(task, "task deleted successfully", null))

    } catch (error) {
        res.status(500).json(response(null, "status : 500 ", error.message));

    }
}

module.exports = {CreateTask, getTask, updateTask, deleteTask}