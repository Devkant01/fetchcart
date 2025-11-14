const jwt = require("jsonwebtoken");
const { jwt_key, node_env } = require("../config/config");

async function isAuthorized(req, res, next) {
    let token = req.cookies.token;
    // const authHeader = req.headers.authorization; //no need, res.cokies used for both production and development
    try {
        if (!token) {
            return res.status(401).json({ message: "Access denied: No token provided" });
        }

        const decoded = jwt.verify(token, jwt_key);
        req.user = decoded;

        next();
    } catch (err) {
        console.log("Alert! middleware/isAuthorized just knocked");
        res.clearCookie("token");
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please login again" });
        }
        return res.status(400).json({ message: "Invalid token" });
    }
}

module.exports = { isAuthorized };
