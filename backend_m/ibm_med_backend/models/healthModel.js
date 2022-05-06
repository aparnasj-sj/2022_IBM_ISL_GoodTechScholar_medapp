const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
//const emailValidator=require('email-validator');
const db_link="mongodb+srv://aparna_1111:mayjune@cluster0.rib04.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db_link)// promise based hence can put then
.then(function(db){// gets a database
console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const healthSchema = new mongoose.Schema({
    oid:{
        type:ObjectId,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
        
    }
    , weight:{
        type:Number
       
    

    },
    height:{
        type:Number
      

    },
    allergies:{
        type:Array
       
      }
});

const healthModel = mongoose.model('healthModel', healthSchema);
  
 module.exports=healthModel;