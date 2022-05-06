const res = require('express/lib/response');
let userModel=require('../models/userModel');

module.exports.getAllDetails=async function getAllUsers(req,res){
    // from DB
    let allDetails=await userModel.findOne({name:req.body.name});
   return res.json({'message':'all users reterived ',data:allDetails});
}
