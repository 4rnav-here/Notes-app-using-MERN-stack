const asyncHandler = require("express-async-handler");
const Contact = require("../models/user.models");
const jwt = require("jsonwebtoken");

const User = require("../models/user.models");
const Note = require("../models/note.models");

const addNote = asyncHandler(async (req, res) => {
  const { title, content, tags, isPinned } = req.body;
  const userId = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }
  if (!userId) {
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized: User ID missing" });
  }
  try {
    const note = new Note({
      title: title,
      content: content,
      tags: tags || [],
      userID: userId,
      isPinned: isPinned || false,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note created successfully",
    });
  } catch (error) {
    console.log("Error creating note:", error);
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
});

const editNote = asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const userId = req.user;

  if (!noteId) {
    return res.status(400).json({ error: true, message: "noteId is required" });
  }
  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "No changes made" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userID: userId });

    if (!note) {
      return res.status(401).json({ error: true, message: "Note not found" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error });
  }
});

const getallNotes = asyncHandler(async (req, res) => {
  const userId = req.user;

  try {
    const notes = await Note.find({ userID: userId }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user;
  try {

    const note = Note.findOne({ _id: noteId, userID: userId });
    if(!note){
      return res.status(401).json({
        error: true,
        message: "Note not found"
      });
    }
      await Note.deleteOne({_id: noteId, userID: userId});

      return res.json({error:false,
        message: "Note deleted successfully"
      });

  } catch (error) {
    return res.status(500).json({error: true, 
      message:"Internal server error"
    });

  }
});

const updatePinNote = asyncHandler( async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user;

  try{
    const note = await Note.findOne({_id: noteId, userID: userId});
    const {isPinned} = req.body;

    if(!note){
      return res.status(401).json({
        error: true,
        message: "Note not found"
      })
    }
    
    if(!isPinned){
      return res.status(401).json({error: true, message: "Pinned status not passed"})
    }  
    note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      message: "Note updated successfully",
      note
    });
    
  }

  catch(error){
    console.log(error)
    return res.status(500).json({error: true,
      message:"Internal server error"
    });
  }

})


module.exports = {
  addNote,
  editNote,
  getallNotes,
  deleteNote,
  updatePinNote,
};
