const express = require('express')
const app = express();

app.use(express.json());    //used to read json data
app.use(express.urlencoded({ extended: true}));   //used to read url dat

//Middleware
app.use(function(req,res,next){
    console.log('middleware chala');
    next();

});

app.use(function(req,res, next){
    console.log('next ne req iss middleware ke pass send kr di so middleware chala again');
    next();    //req sent to routes(/)
})

app.get('/', function(req, res){   //Routes="/" for example www.youtube.com/ ,  slash(/) is route we can give any page name then route will open directly that page written after / or route
    res.send("Hello World Mohit");
})

app.get('/profile', function(req,res, next){
   return next(new Error("Not Implemented"));
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})



app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});