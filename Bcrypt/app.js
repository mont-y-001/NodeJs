const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// app.get("/",(req,res) =>{
//     res.cookie("name","Mohit_Yadav");   //cookies set ki gyi h iss line me
//     res.send("Done");
// })

// app.get("/read",(req,res) =>{
//    console.log(req.cookies);    //cookies read kese krte h
//     res.send("Read Page");
// })


// app.get("/",(res,req)=>{
//     bcrypt.genSalt(10,function(err, salt){
//        bcrypt.hash("Mont_y_adav001",salt,function(err, hash){
//         console.log(hash);
//        });
//     });
// })

//encrypt token bda sa string ko browser pr kese bheje
app.get("/",(req,res)=>{
        let token =  jwt.sign({email: "my266620@gmail.com"},"secret");
        res.cookie("token",token);
        res.send("Done")
})

//how to decrypt data from browser that was in token form(string)
app.get("/read",(req,res)=>{
   let data = jwt.verify(req.cookies.token,"secret");
   console.log(data);
})
app.listen(3000);