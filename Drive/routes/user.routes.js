const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/register',(req,res)=>{
    res.render("register");
})

router.post('/register',
    body('username').trim().isLength({min:3}),
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:5}),
    async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array(),
                message : 'Invalid Data' 
            })
        }
               const{username,email,password} = req.body; 

               const hashpassword = await bcrypt.hash(password,10) 
                
               const newUser = await userModel.create({
                username,
                email,
                password: hashpassword,
               })
                 
               res.json(newUser);


        // console.log(errors);
        // res.send(errors);

    // console.log(req.body);
    // res.send("User Registered");
})

router.get('/Login',(req,res)=>{
    res.render("Login");
})

router.post('/Login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                message:"Invalid Data"
            })
        }

        const {username, password} = req.body;

        const user = await userModel.findOne({
            username: username
        })

        if(!user){
            return res.status(400).json({
                message: "username or password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message : "Username or password is incorrect"
            })
        }
        // jsonwebtoken
        const token = jwt.sign({
            userId : user._id,
            email: user.email,
            username : user.username
        },
    process.env.JWT_SECRET,
)
res.json({
    token
})
    }
)

module.exports = router;
