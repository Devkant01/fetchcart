const User = require("../../models/User");
const jwt = require('jsonwebtoken');

async function verifyToken(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "No token found" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("name email role");

        res.status(200).json({
            isValid: true,
            user: user
        });
    } catch (err) {
        res.status(401).json({ isValid: false, message: "Invalid or expired token" });
    }
}