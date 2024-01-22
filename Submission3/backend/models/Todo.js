const mongoose = require("mongoose")
//ToDos Schema; check who the user is first and then allow/grab the user's ToDos from the database
const TaskSchema = new mongoose.Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            
        },
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);
//export model
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
/*
//Sources used include Hyperiondev notes, previous Tasks, etc.
*/