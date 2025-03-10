const asyncHandler = require("express-async-handler");
const Contact = require("../models/user.models");
const jwt = require("jsonwebtoken");

const User = require("../models/user.models");
const Note = require("../models/note.models");

// TODO: Add try catch everywhere 

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
        _id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
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
    const user = {
      fullName: userInfo.fullName,
      email: userInfo.email,
      _id: userInfo._id, // ✅ Ensure this field is included
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
      user,//user and email both being sent ? 
    });
    //add try catch before and after db calls 
  } else {
    return res.json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

const getUser = asyncHandler( async (req, res) => {
  const userId = req.user;
  try{
    const isUser = await User.findOne({_id: userId})

    if(!isUser){
      return res.json({
        error: true,
        message: "No such user found"
      })
    }
    
    return res.json({
      message:"User found",
      isUser
    })
    }

  catch(error){
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error"
    })
  }



})


module.exports = {
  createAccount,
  Login,
  getUser
};
