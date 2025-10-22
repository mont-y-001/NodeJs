const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get('/',(req, res)=>{
    res.send("Hello");
});

app.get('/create', async (req, res)=>{
   let user = await userModel.create({
    username: "Mohit",
    age: 21,
    email:"my266620@gmail.com"
    })
    res.send(user);
});

app.get("/post/create", async (req,res)=>{
    let post = await PostModel.create({
        postdat: "hello bacho",
        user: "database id"
    })
    let user = await userModel.findOne({_id:"database id"});
    user,posts.push(post._id);
    await user.save();
    res.send(post,user);
})


app.listen(3000);