const User = require("../../models/user");
const { admin_psw, node_env } = require("../../config/config");
const { generateToken } = require("../../utils/generateToken");

async function adminRequest(req, res) {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        if (password !== admin_psw) {
            return res.status(401).json({ message: "Incorrect admin password" });
        }
        const userId = req.user.objectId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.role = "admin";
        await user.save();
        req.user.role = "admin"; // update role in req.user as well
        const token = generateToken(req.user);
        // Set the updated token in cookies
        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            secure: node_env === 'production',
            sameSite: node_env === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return res.status(200).json({ message: "User role updated to admin successfully" });

    } catch (err) {
        console.log("Alert! controller/userAuthController~adminRequest just knocked");
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = { adminRequest };