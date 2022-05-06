const mongoose = require('mongoose');
const emailValidator=require('email-validator');
const db_link="mongodb+srv://aparna_1111:mayjune@cluster0.rib04.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(db_link)// promise based hence can put then
.then(function(db){// gets a database
console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    }
    , password:{
        type:String,
        required:true,
        minLength:5,
        validate:function(){
            this.confirmPassword==this.password;
        }
    

    },
    confirmPassword:{
        type:String,
        required:true
        ,minLength:5

    },
    role:{
        type:String,
        enum:['doctor','user'],
        default:'user'
      },
      profileImage:{
        type:String,
        default:'../Images/UserIcon.png'
      },
      dob:{
          type:Date
      },
      contactno:{
          type:String
      },
      address:{
          type:String
      },
      country:{
          type:String
      },
      City:{
          type:String
      }
});
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
}) 
const userModel = mongoose.model('userModel', userSchema);
  // name of db , which schema its mapped 
 module.exports=userModel;