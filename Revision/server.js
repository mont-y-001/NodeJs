//##    http server craetion technique  ##

// const http = require('http');

// const Server = http.createServer((req,res)=>{
//     // console.log(req.url);     //give '/' route in terminal

//     if(req.url == "/about"){
//         res.end("This is about Page");
//     }
//     res.end("Hello World");
// })

// Server.listen(3000);





//  ## Express Server Creation Method ##
const express = require('express');
const app = express();

app.set("view engine",'ejs');

app.use((req,res,next) =>{
    console.log("This is Middleware");  //browser response nhi de payega until hum next() call return nhi krenge
    //res.send("Haa bhai ye browser me dikhega");

    const a = 10;
    const b = 20;
    console.log(a+b);
      next(); // pass control to the next middleware/route
})

app.get('/',(req,res) =>{
    res.render('index');
})
app.get('/about',(req,res) =>{
    res.send("This is About Route");
})
app.get('/Profile',(req,res) =>{
    res.send("This is Profile Route");
})

app.listen(3000);