require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const todoRoutes = require("./routes/todoRoutes")
const app = express()
const path = process.env.PORT || 3001
//Add the Cross Origin Resource Sharing, allowing the server to handle requests from different domains
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Incorporate the user and todo routes
app.use("/user", userRoutes)
app.use("/todos", todoRoutes)
//Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("You are now connected to the database!");
//Listening port
app.listen(path, () =>{
    console.log(`Your server is working on port ${path}`);
});
//log error if failed to connect
}).catch((error) =>{
    console.log(error);
});
/* PLEASE IGNORE THIS CODE. THIS IS FOR EDUCATIONAL PURPOSES!!
const express = require("express")
//use express, jwt, cors, mongoose, require the todo and user routes
//require the .env
// ustilise app.use() to use the abovementioned 
//connect to database
//const mongoDB = "mongodb+srv://horizonsow:armageddon@cluster0.xxu6arn.mongodb.net/?retryWrites=true&w=majority"
const port = process.env || 3001
//mongoose.connect( mongoDB).then(() => {
})
)
EG...
mongoose.connect(process.env.MONGO_URL).then(() =>{
 console.log("Connected to database!");
Keep the middleware and utilise app.use for the routes . Make sure auth and user routes have nice uniqe names
//app.listen (PORT, () => console.log(`Your Port is working on ${PORT} `))
use the port number to start the server
cors
dotenv
express
jwt
mongoose
nodemon*/