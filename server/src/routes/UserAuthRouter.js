const express = require("express");
const userRouter = express.Router();

const authController = require('../controllers/AuthController.js');
const generateToken = require("../middleware/generateToken.js");


userRouter.post('/register', authController.registerUser);
userRouter.post('/login', authController.userLogin, generateToken, authController.loginResponse);

userRouter.post('/logout', authController.logout);

module.exports = userRouter;