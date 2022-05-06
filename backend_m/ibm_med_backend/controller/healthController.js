const express = require('express');
let userModel = require('../models/userModel');
let healthModel = require('../models/healthModel');
module.exports.getMoreDetails=async function getmoreDetails(req,res){
    // from DB
    try{
    if(req.cookies.oid){
    let allDetails=await healthModel.findOne({"oid":req.cookies.oid});

   return res.json({'message':'all data reterived ',data:allDetails});
}else{
    return res.json({'message':'not logged in '});

}
    }catch(err){
        return res.json({'messgae':err});
    }
}
module.exports.setMoreDetails=async function setMoreDetails(req,res){
    // from DB
    if(req.cookies.oid){
    try {
        req.body.oid=req.cookies.oid;
        let dataObj = req.body;
        
       
        let doc = await healthModel.create(dataObj);
        console.log(doc);
        //endMail("signup",user);// nodemailer
        if (!doc) { return res.json({ 'message': 'error in submitting details' }); }

        res.json({ 'meaasge': 'enetered data', data: doc });
    } catch (err) {
        return res.status(500).json({ 'meaasge': err });
    }
}else{
    return res.status(500).json({ 'meaasge': 'login' });
}
}
