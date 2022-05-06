const express = require('express'); /// returns a function
const app = express(); // invoke the function
let  cookieParser = require('cookie-parser'); 
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
let bodyParser=require('body-parser');
const docModel=require('./models/docModel');
const PORT=3000;
app.listen(PORT, ()=>{
	console.log(`server running on ${PORT} `);
});
//app.use(express.json());


//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


//app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('hello world')
  })

const userRouter = require('./routers/userRouter');
const healthRouter = require('./routers/healthRouter');

app.use('/user',userRouter)
app.use('/health',healthRouter)

app.post("/uploadphoto",upload.single('myfile'),(req,res)=>{
  oid=req.cookies.oid;
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
      
      //contentType:req.file.mimetype,
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
  };
  var fileobj={
    oid:oid,
    fl:final_img

  }

  docModel.create(fileobj,function(err,result){
      if(err){
          console.log(err);
      }else{
          //console.log(result.img.Buffer);
          console.log("Saved To database");
          res.contentType(final_img.contentType);
          res.send(final_img.image);
      }
  })
})