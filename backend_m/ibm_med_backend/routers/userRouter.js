const express = require('express');

let userModel = require('../models/userModel');
let healthModel = require('../models/healthModel');
const fs = require("fs");

const mongoose = require("mongoose");

const { getAllDetails } = require('../controller/userController');
const { signup, login ,isAuthorised,protectRoute} = require('../controller/authController');
let cookieParser = require('cookie-parser');
const multer = require('multer')
const userRouter = express.Router();
userRouter.route('/signup')
    .post(signup);

userRouter.route('/login')
    .post(login);
userRouter.use(protectRoute);

userRouter.use(isAuthorised);
userRouter
        .route('/getUser')
        .get(getAllDetails)// doctor only 
module.exports = userRouter;
