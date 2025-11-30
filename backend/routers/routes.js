const express = require("express")
const router = express.Router();
const {createAccount, Login, getUser} = require("../controllers/accountController");
const app = express();
const validateToken = require("../middleware/validateToken");
const { addNote, editNote, getallNotes, deleteNote, updatePinNote, searchNote } = require("../controllers/noteControlller");

//User Account Routes
router.route("/createAccount").post(createAccount);
router.route("/login").post(Login);
router.get("/getuser",validateToken, getUser)


//Note Routes
router.post("/addnote", validateToken, addNote);
router.post("/editnote/:noteId", validateToken, editNote);
router.get("/getallnotes", validateToken, getallNotes);
router.delete("/deletenote/:noteId", validateToken, deleteNote);
router.put("/pinnote/:noteId", validateToken, updatePinNote);
router.get("/searchnote/", validateToken, searchNote);

module.exports = router;