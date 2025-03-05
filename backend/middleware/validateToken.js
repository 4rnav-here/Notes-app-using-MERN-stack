const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv").config();

const validateToken = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }
    
        if (!decoded.user || !decoded.user._id) {  // ✅ Now checking correctly
            return res.status(401).json({ error: "Unauthorized: Invalid user data in token" });
        }
    
        req.user = decoded.user; // ✅ Assign correctly
        next();
    });
    
})

module.exports = validateToken;