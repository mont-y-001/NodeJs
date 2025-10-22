const express = require('express');
const app = express();

app.use(express.json());  //this line and next line setting up of paresers
app.use(express.urlencoded({extended: true}));

const path = require('path');
app.use(express.static(path.join(__dirname,'public'))); // static file(images,fron js,videos) ke liye dir_name(it's a path from user to current folder) and path.join add public in dir_name so it will indicate whole path means public folder
app.set('view engine', 'ejs');  //it render ejs on frontend

app.get('/',function(req,res){
    res.render("index");
});

app.get('/profile',(req,res)=>{
    res.send("Okk babe sab thik hai");
})

//Dynamic Routing=> colons used before any routes it will become dynamic  
app.get('/profile/:username',(req,res)=>{
    res.send(`Welcome: ${req.params.username}`);  //req.params indicate colon vaala route
})

app.get('/profile/:usrname/:age',(req,res)=>{
    res.send(`Welcome: ${req.params.username} and your age is ${req.params.age}`)
} )
app.listen(3000,function(){
    console.log("The server is running")
})
