const Task = require("../models/Todo")
//Create a new task
const addTask = async (req, res) => {
    const {content} = req.body
    try{
        const task = new Task({
            content,
        });

        //save to database
        await task.save()
        //send the created task
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({message: "An internal server error has occured: addTask error!"})
    }

}

const editTask = async (req, res) => {
    try{
        const {id} = req.params
        const {content, completed } = req.body
    
        const editedTask = await Task.findByIdAndUpdate(
            id,
            {content, completed},
            {new: true}
        )
        if(!editedTask) {
            return res.status(404).json({error: "No to-do item found"})
        }    
        res.json(editedTask)
    } catch (error){
        res.status(500).json({ message: "There seems to be a problem with the server. Edit task error" })
    }
}

const deleteTask = async (req, res) => {
    try{
        const { id } = req.body

        const deletedTask = await Task.findOneAndDelete(id)

        if(!deletedTask){
            return res.status(404).json({ message: "No to-do item found"})
        }
        //send a No Content status code -> meaning that the server has brought back nothing
        res.sendStatus(204)

    } catch (error) {
        res.status(500).json ({ message: "There seems to be a problem with the server. Deleting tasks error"})
    }
}

const getAllTasks = async (req, res) => {
    try{
        //const {taskId} = req.user._id 
        const tasks = await Task.find()

        res.json(tasks)
    } catch (error) {
        res.status(500).json ({message: "There is a problem with the server. Getting tasks error"})
    }
}
module.exports = {
    addTask,
    editTask,
    deleteTask,
    getAllTasks,
}