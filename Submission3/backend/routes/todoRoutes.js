/*
router.post("/todos", todoController.register)
*/
//Bring in express and etc
const express = require("express")
const taskController = require("../controllers/todoControllers")
const router = express.Router()
const {
    userAuthenticate,
    validateContentType,
    validateTaskLength
} = require("../middleware/middleware")
     
//GET request to get all the tasks
router.get("/", userAuthenticate, taskController.getAllTasks)
//POST request to create a new task
router.post("/",userAuthenticate, validateTaskLength, validateContentType, taskController.addTask)
//DELETE request to delete a task
router.delete("/:id", taskController.deleteTask)
//PUT request to update a task
router.put("/:id", taskController.editTask)
//Send out this route to server.js
module.exports = router