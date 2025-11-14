const jwt = require("jsonwebtoken"); 
const { jwt_key } = require("../config/config");

function generateToken(user) {
    const token = jwt.sign({
        objectId: user.objectId,
        name: user.name,
        email: user.email,
        role: user.role,
    }, jwt_key, {
        expiresIn: "1d"
    })

    return token;
}

module.exports = { generateToken };