//Require express, jwt, models, etc AND USE app.use(Router)
const User = require("../models/User")
const jwt = require("jsonwebtoken")
// Register and Login

// route for user registration 

// we can first check if the username and password already exist in database
// if not, respond with error message

const register = async(req, res) => {
    //Keep properties to 2: username and password
    const {username, password} = req.body
    try{
        //Look if the user has already registered.
        const existingUser = await User.findOne({ username })
        //If they have, send an error 
        if( existingUser){
            return res.status(409).json({message: "Username already exists"})
        }
        //Create a User with username and password
        const newUser = new User({ username, password})
        //Save the user to the database
        await newUser.save()
        //Send a JSON message
        res.json({message: "User registered successfully"})
        
        //Error handling 
    } catch (error){
        res.status(500).json({ message: "There is a problem with the server or database!"})
    } 

}
//This controller goes with the login route. This handles the logic for logging in
const login = async (req, res) => {
    const {username, password} = req.body
    try{
        //Search for the user in the database
        const userLogin = await User.findOne({username, password})
        //If the user is not found, return an 404. error
        if(!userLogin){ 
            return res.status(404).json({ message: "User not found!!!!!"})
    }   //Assign a JWT with the user
        const token = jwt.sign({userId: userLogin}, "secretKey")
        //Send the token as a response in JSON format
        res.json({token})
        //Error handling
    } catch(error){
        console.log("An error has occured:", error)
    }

}
module.exports = {
    register,
    login,
}