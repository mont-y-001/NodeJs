const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model')
const File = require('../Models/file.model');
const authMiddleware = require('../Middleware/auth');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require("multer");
const { supabase } = require("../supabaseClient");

router.get('/register', (req, res) => {
    res.render("register");
})

router.post('/register',
    body('username').trim().isLength({ min: 3 }),
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid Data'
            })
        }
        const { username, email, password } = req.body;

        const hashpassword = await bcrypt.hash(password, 10)

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

router.get('/Login', (req, res) => {
    res.render("Login");
})

router.post('/Login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: "Invalid Data"
            })
        }

        const { username, password } = req.body;

        const user = await userModel.findOne({
            username: username
        })

        if (!user) {
            return res.status(400).json({
                message: "username or password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Username or password is incorrect"
            })
        }
        // jsonwebtoken
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
        )
        res.cookie('token', token)
        res.send('Logged in')
    }
)



// Set up Multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for uploading files
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from("Mohit-Drive") // <-- your Supabase bucket name
      .upload(`uploads/${Date.now()}_${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw error;

    // Get a public URL for the file
    const { data: publicData } = supabase.storage
      .from("Mohit-Drive")
      .getPublicUrl(data.path);

      // Save file metadata to MongoDB
    await File.create({
      user: req.user.userId,        // from JWT
      fileName: file.originalname,
      fileUrl: publicData.publicUrl,
      fileType: file.mimetype,
      fileSize: file.size,
    });

    res.json({
      message: "File uploaded successfully",
      fileURL: publicData.publicUrl,
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "File upload failed", error: err.message });
  }
});

module.exports = router;
