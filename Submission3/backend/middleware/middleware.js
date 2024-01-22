/*
//const express and such....

Use userAuthenticate for Todo's not register and login!*/
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const userAuthenticate = async (req, res, next) => {
  try {
    // JWT in the authorization header
    const auth = req.headers['authorization'];
    const token = auth.split(" ")[1]; // Using space as the delimiter
    // Verify the JWT
    const jwtVerified = jwt.verify(token, 'jwt-secret');
    // Extract the userId
    const userId = jwtVerified.userId;
    // Get the user from the database
    const user = await User.findById(userId);
    // If the user is not found, send an error
    if (!user) {
      res.status(401).json({ message: "Unauthorized user!" });
    }
    // Attach the authenticated user to the request object
    req.user = user;
    // Call the next function
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized user. Error authenticating user!" });
  }
};
//This is for login and registration!
const isGmailUser = (req, res, next) => {
  // Get the username from the request body
  const {username} = req.body
  // console.log(email)

  // If the username does not end with '@gmail.com', the user is not authorized
  if (!username || !username.endsWith("@gmail.com")) {
    return res.status(403).send('Unauthorized. Only Gmail users are allowed to access this resource.');
  }

  // The user is authorized, so call the next middleware function
  next();
};

// Middleware to reject the addition of tasks that exceed 140 characters

const validateTaskLength = (req, res, next) => {
  // Get the task from the request body'
  const { task } = req.body
  //check if the task length is > 140 characters
  if(task.length > 140) {
    return (
      res
      //sends a 403 response with teh corr error message
        .status(403)
        .json({ message: "Task length exceeds 140 characters" })
    )
  }
   next();
};

// Middleware to reject any requests that are not of the JSON content type

const validateContentType = (req, res, next) => {
  // Get the content type from the request headers
  const contentType = req.headers["content-type"]
  //check if the content type is not application/json
  if(contentType !== "application/json") {
    return res.status(415).json({ message: "Unsupported media type."})
  }
  // The user is authorized, so call the next middleware function
  next();
};

module.exports = {
  userAuthenticate,
  isGmailUser,
  validateTaskLength,
  validateContentType,
}
