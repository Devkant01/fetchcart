const Api = require("../models/api.js");

async function isValidApi(req, res, next) {
    const apiKey = req.params.apiKey;
    try {
        const api = await Api.findOne({ apiKey });
        if (!api) {
            return res.status(401).json({ status: "error", message: "Invalid API key. Please provide a valid API key." });
        }
        api.lastUsed = new Date();
        await api.save();
        next();
    } catch (error) {
        console.log("Alert! middleware/isValidApi just knocked");
        res.status(500).json({ message: error.message });
    }
};

module.exports = { isValidApi };