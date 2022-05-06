const express = require('express');

let userModel = require('../models/userModel');
let healthModel = require('../models/healthModel');
const {getMoreDetails,setMoreDetails}=require('../controller/healthController');

const { protectRoute} = require('../controller/authController');

//healthRouter.use(protectRoute);
const healthRouter = express.Router();

healthRouter
        .route('/getMore')
        .get(getMoreDetails)// doctor only 
        .post(setMoreDetails)
module.exports = healthRouter;