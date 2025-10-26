const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/register',(req,res)=>{
    res.render("register");
})

router.post('/register',
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
    async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array(),
                message : 'Invalid Data' 
            })
        }
               const{username,email,password} = req.body;
               const newUser = await userModel.create({
                username,
                email,
                password
               })



        // console.log(errors);
        // res.send(errors);

    // console.log(req.body);
    // res.send("User Registered");
})

module.exports = router;
