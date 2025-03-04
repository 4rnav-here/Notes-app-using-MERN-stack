const asyncHandler = require("express-async-handler")
const Contact = require('../models/user.models');
const jwt = require("jsonwebtoken");

const User = require("../models/user.models");
const Note = require("../models/note.models");

const createAccount = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
      return res.status(400).json({ error: "Full name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const isUser = await User.findOne({
      email: email,
    });
    if (isUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      fullName,
      email,
      password,
    });

    const accessToken = jwt.sign(
      {
        user: {
          fullName: user.fullName,
          email: user.email,
          userId: user._id
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );
    await user.save();

    return res.json({
      error: false,
      user,
      accessToken,
      message: "User Created Successfully",
    });
  });

const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(401).json({
        error: "Email is mandatory",
      });
    }
    if (!password) {
      return res.status(401).json({
        error: "Password is mandatory",
      });
    }

    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
      return res.json({
        message: "User not found",
      });
    }
      if (userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(
            {
              user: {
                fullName: user.fullName,
                email: user.email,
                userId: user._id
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "10m",
            }
          );
        return res.json({
          error: false,
          message: "Login Successful",
          email,
          accessToken,
        });
      } else {
        return res.json({ 
          error: true, message: "Invalid Credentials"
        });
      }
  });

const addNote = asyncHandler(async(req, res) => {
    const {title, content, tags, isPinned} = req.body;
    const user = req.user.userId;

    if(!title){
        return res.status(400).json({error:true, message: "Title is required"})
    }
    if(!content){
        return res.status(400).json({error:true, message: "Content is required"})
    }
    
    try{
        const note = new Note({
            title: title,
            content: content,
            tags: tags || [],
            userId: user.userId,
            isPinned : isPinned || false
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note created successfully"
        });
    }
    catch(error){
        console.error("Error creating note:", error);
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
})


module.exports = {
    createAccount,
    Login,
    addNote
}