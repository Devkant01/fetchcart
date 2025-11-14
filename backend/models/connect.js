const mongoose = require("mongoose");
const { db_connection } = require("../config/config");

async function connect() {
    try {
        await mongoose.connect(db_connection);
        return Promise.resolve("DB connection established");
    } catch (e) {
        return Promise.reject("Failed to Connect DB ", e.message);
    }
}

module.exports = { mongoose, connect };