const asyncHandler = require("express-async-handler")
const Contact = require('../models/user.models');
const jwt = require("jsonwebtoken");

const User = require("../models/user.models");
const Note = require("../models/note.models");



module.exports = {
    addNote
}