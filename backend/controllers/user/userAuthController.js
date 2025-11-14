const User = require("../../models/user");
const bcrypt = require('bcrypt');
const { salt_rounds, admin_psw, node_env } = require("../../config/config");
const { generateToken } = require("../../utils/generateToken");


async function userController(req, res){
    if (!req.user.email) {
        res.status(401).send("Access denied: No token provided");
    } else {
        res.status(200).send({
            name: req.user.name,
            role: req.user.role,
            email: req.user.email,
        });
    }
}

async function logoutController(req, res){
    res.clearCookie("token", {
        httpOnly: true,
        secure: node_env === 'production' ? true : false,
        sameSite: 'lax'
    });
    return res.status(200).send("Logout successful");
}

async function signinController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All input fields are required",
                receivedDetails: req.body,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const details = {
            objectId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = generateToken(details);

        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            secure: node_env === 'production',
            sameSite: node_env === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        const responseUser = {
            name: user.name,
            email: user.email,
            role: user.role,
        };

        if(node_env === 'development') {
            responseUser.token = token;
        }

        return res.status(200).json({
            message: "Login successful",
            ...responseUser,
        });
    } catch (err) {
        console.log("Alert! controller/userAuthController~login just knocked");
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}


async function signupController(req, res) {
    try {
        const { email, password, name } = req.body;
        
        const role = "user"; // Default role is 'user'

        if (!email || !password || !name || !role) {
            return res.status(400).json({ message: "All input are required" });
        }

        // Check if the user already exists
        
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ message: "User already exists. Please login." });
        }

        // Hash password
        
        const hashedPassword = await bcrypt.hash(password, Number(salt_rounds));

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Save new user to the database
        const user = await newUser.save();
    
        // Generate a token with both email and ObjectId
        const details = {
            objectId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        const token = generateToken(details);

        // Set the token in the cookie with email and ObjectId
        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            secure: node_env === 'production',
            sameSite: node_env === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        const responseUser = {
            name: user.name,
            email: user.email,
            role: user.role,
        };

        if (node_env === 'development') {
            responseUser.token = token;
        }

        return res.status(201).json({ message: "User created successfully", ...responseUser });
    } catch (error) {
        console.log("Alert! controller/userAuthController~signup just knocked");
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    signinController,
    signupController,
    logoutController,
    userController
}