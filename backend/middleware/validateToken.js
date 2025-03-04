const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; // ✅ Corrected headers access
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: true, message: "Forbidden: Invalid token" });
        }

        console.log("Decoded JWT:", decoded); // Debugging line

        req.user = decoded.user; // ✅ Correct extraction of `user`
        next();
    });
}

module.exports = { validateToken };
