//import express and etc
const express = require("express")
const { isGmailUser } = require("../middleware/middleware")
//import controllers
const  userController  = require("../controllers/userControllers")
const router = express.Router()

//POST request to register a new user
router.post("/register", isGmailUser, userController.register)
//POST request to login a new user
router.post("/login", isGmailUser, userController.login)
//export the router
module.exports = router