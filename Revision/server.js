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

app.get('/',(req,res) =>{
    res.send("Hello Guyzz");
})
app.get('/about',(req,res) =>{
    res.send("This is About Route");
})
app.get('/Profile',(req,res) =>{
    res.send("This is Profile Route");
})

app.listen(3000);