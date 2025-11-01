const express = require('express');
const app = express();
const UserRouter = require('./routes/user.routes');

const dotenv = require('dotenv');
dotenv.config();       //iss methos ko call krne se .env file me Mongouri ko puree application ka access mil jaata h
const connectToDB = require('./config/db');
connectToDB();   // ✅ Connect to MongoDB after dotenv is loaded
const indexRouter = require('./routes/index.routes')

const cookieParser  = require('cookie-parser');




//##Koi kaam ka nhi hai kyunki hum routes alag se create krenge routes folder me
// app.get('/',(req,res) =>{
//     res.send("Hello Mohit ");
// })

app.set('view engine','ejs');
app.use(cookieParser())  //middleware

//Agr ye middleware use nhi krega too terminal me undefined show hoga instead object of data 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',indexRouter);
app.use('/user',UserRouter);



//## "start":"npx nodemon app.js"  => isko krne se sirf terminal me npm start likna pdega
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
