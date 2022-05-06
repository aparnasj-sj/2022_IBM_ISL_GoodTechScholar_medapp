const express = require('express');
let userModel = require('../models/userModel');
let  cookieParser = require('cookie-parser'); 
module.exports.signup = async function postSignUp(req, res) {
    try {
        let dataObj = req.body;
        console.log(dataObj);
        let user = await userModel.create(dataObj);
        //endMail("signup",user);// nodemailer
        if (!user) { return res.json({ 'message': 'error in user sign up' }); }

        res.json({ 'meaasge': 'user signed up', data: user });
    } catch (err) {
        return res.status(500).json({ 'meaasge': 'user signed up', data: user });
    }

}


module.exports.login = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {

                if (user.password == data.password) {
                    // whenevr user log in 


                    //Making signature 
                    let uid = user['_id'];// uid is unique
                    //let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('oid',user._id,  {expire: 360000 + Date.now()}, { httpOnly: true });
                    console.log(res.cookie.oid);
                    return res.json({
                        message: 'user log in sucess  ',
                        data: user
                    });

                } else {
                    return res.json({
                        message: 'wrong credentials '
                    });

                }

            } else {
                return res.json({
                    message: 'user not found'
                });
            }
        } else {
            return res.json({ message: 'please enter valid email' });
        }
    }// try end 
    catch (err) {
        return res.json({
            message: err.message
        })
    }//catch 
}

module.exports.isAuthorised =async  function isAuthorised(req,res,next) {
   
   // return  function (req, res, next) {
    try {
      roles=['doctor']
        if (roles.includes(req.role) == true) {
            //print(req.role)
            console.log(req.role);
            next();// next to be exe is   is getAllUser fun

        } else {
            return res.status(401).json({
                message: 'operation not allowed'
            });
        }
    }catch(err){
        return res.json({ 'error messgae': err });
    }
    }

//}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        if (req.cookies.oid) {
            console.log(req.cookies.oid);
            if (req.cookies.oid) {
                const user = await userModel.findById(req.cookies.oid);
                // modifying req object by this as  middlware 
                // now get user fun will get all tes attr
    
                req.role = user.role;
                req.id = user.id;
                next();
            } else {
                return res.json({ 'messgae': 'user not verified , (din get  login id ) ' });
            }
        }
    }catch(err){
        return res.json({ 'error messgae': err });

    }
    }