const express = require('express');
const app = express();
const userModel = require("./models/user");

const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Set up middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Home route
app.get('/', (req, res) => {
    res.render("index");
});

// ✅ Add missing GET /login route
app.get('/login', (req, res) => {
    res.render("login"); // Make sure login.ejs exists in views/
});

// Create user route
app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send("Error generating salt");

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.status(500).send("Error hashing password");

            try {
                let createdUser = await userModel.create({
                    username,
                    email,
                    password: hash,
                    age
                });

                let token = jwt.sign({ email }, "shhhh");
                res.cookie("token", token);
                res.send(createdUser);  // ✅ Fixed typo and properly sends response
            } catch (e) {
                res.status(500).send("User creation failed: " + e.message);
            }
        });
    });
});

// User login route
app.post("/login", async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.send("User not found");

        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) return res.status(500).send("Error comparing passwords");

            if (result) {
                let token = jwt.sign({ email: user.email }, "shhhh");
                res.cookie("token", token);
                res.send("Login successful");
            } else {
                res.send("Incorrect password");
            }
        });
    } catch (e) {
        res.status(500).send("Login failed: " + e.message);
    }
});

// Logout route
app.get("/logout", (req, res) => {
    res.cookie("token", " ");
    res.redirect("/");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
