const express = require("express")
const router = express.Router();
const {createAccount, Login, addNote} = require("../controllers/accountController");
const app = express();
const {validateToken} = require("../middleware/validateToken");


router.route("/createAccount").post(createAccount);
router.route("/login").post(Login);
router.post("/addnote", validateToken, addNote);


module.exports = router;