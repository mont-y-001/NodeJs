const express = require('express');
const app = express();
const dbconnection = require('./config/db')
const userModel  = require('./models/user')

//used for set view engine=>ejs to render html file in nodejs
app.set("view engine",'ejs');


//## These 2 lines are middleware(In-built) used to read data by "Post" that store in "req.body".   
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//##This Middleware is used to link static files(js,css or for public folder)
app.use(express.static("public")); 

//##get=> from server to frontend
// app.get('/get-form-data',(req,res)=>{
//     console.log(req.query);               //sensitive data show in http link so we use app.post() method for form
//     res.send(`Data Recieved`)
// })


//##post=>from frontend to server
app.post('/get-form-data',(req,res)=>{            
    console.log(req.body);                //we have to specify on form that it is post method otherwise it is manual take get method request
    res.send(`Data Recieved on server`)   
                                          
})

app.get('/',(req,res)=>{
    res.render("index");
})


app.get('/register',(req,res)=>{
    res.render("register");
})

app.post('/register', async (req,res)=>{
   const {username, email, password} = req.body;    //This is De-Structuring to store data in req.body
    

   //await work as it pause the execution of async function means first await function run then will rest code execute
   let newUser = await userModel.create({
    username:username,
    email: email,
    password: password
   })
//    res.send("User Registered Successfullykk")
    res.send(newUser);
})


//##READ OPERATION
app.get('/get-user',(req,res)=>{
    userModel.findOne({                  
//#Find => If no element found it will return [] (empty array)   
//#FindOne=> if no element or data found it will return null and in case of same name of user it will return 1st user in all of them
        username:'Mohit Yadav'
    }).then((user)=>{
        console.log(user)
        res.send(user);
    })
})

//##UPDATE OPERATION
app.get('/update-form', async (req,res)=>{      //async and await must to perform updation
    await userModel.findOneAndUpdate({
        username : "Monty yadav"    //if you are searching on the basis of username be sure that it must be correct(spelling,no extra space)
    },{
        email:"bhuttayadav123@gmail.com"    //updated email
    })
    res.send("User Updated");
})


//##Delete OPERATION
app.get('/delete-user', async (req,res)=>{
    await userModel.findOneAndDelete({
        username : "Mohit Yadav"
    })
    res.send("User Deleted")
})

app.listen(3000);