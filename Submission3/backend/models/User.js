 //User Schema
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            //Each username must be unique
            unique: true
        },
        password: {
            type: String,
            required: true,
        },

    }, {
        timestamps: true //record timestamps of when user is created and when update is done
    }
);

//export model
const User = mongoose.model("User", UserSchema);  //  (Make sure the first "User" is uniform!!! OTHERWISE PROBLEMS!!!)
 module.exports = User;

