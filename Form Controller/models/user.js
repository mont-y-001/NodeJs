const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //Starting 3 values are compulsory for making a schema
    username: String,
    email:String,
    password:String,
    age:Number,
    gender:{
        type:String,
        enum:['male','female']
    }
})

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;