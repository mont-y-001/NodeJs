const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        trim : true,
        lowercase : true,
        unique : true,
        minlength:[3,"Username must be atleast 3 char long"]
    },
    email: {
        type:String,
        required:true,
        trim : true,
        lowercase : true,
        unique : true,
        minlength:[13,"email must be atleast 13 char long"]
    },
    password: {
        type:String,
        required:[true,"Password is required"],
        trim : true,
        unique : true,
        minlength:[5,"Password must be atleast 5 char long"]
    },
})

const user = mongoose.model('user',userSchema);
module.exports = user;