const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {type: String, required: true},
    content: {type:String, required: true},
    tags: {type: [String], required: true},
    isPinned: {type: Boolean, required: true},
    userID: {type: String, required:true},
    createdAt: {type: Date, default: new Date().getTime()}
})

module.exports = mongoose.model("Note", noteSchema)
