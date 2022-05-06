const mongoose = require('mongoose');
const emailValidator=require('email-validator');
const { ObjectId } = require('mongodb');
const db_link="mongodb+srv://aparna_1111:mayjune@cluster0.rib04.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db_link)// promise based hence can put then
.then(function(db){// gets a database
console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const docSchema = new mongoose.Schema({
    oid:{
        type:ObjectId,
        //required:true
    },
    fl:
    {
        data: Buffer,
        contentType: String
    }
   
});

const docModel = mongoose.model('docModel', docSchema);
  // name of db , which schema its mapped 
 module.exports=docModel;