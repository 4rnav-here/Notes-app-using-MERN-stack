const express = require("express")
const router = express.Router();
const {createAccount, Login, getUser} = require("../controllers/accountController");
const app = express();
const validateToken = require("../middleware/validateToken");
const { addNote, editNote, getallNotes, deleteNote, updatePinNote } = require("../controllers/noteControlller");

//User Account Routes
router.route("/createAccount").post(createAccount);
router.route("/login").post(Login);
router.get("/getuser",validateToken, getUser)


//Note Routes
router.post("/addnote", validateToken, addNote);
router.post("/editnote/:noteId", validateToken, editNote);
router.post("/getallnotes", validateToken, getallNotes);
router.delete("/deletenote/:noteId", validateToken, deleteNote);
router.post("/updatepinnote/:noteId", validateToken, updatePinNote);


module.exports = router;