const { mongoose } = require("./connect.js");
const User = require("./user.js");

const apiSchema = new mongoose.Schema({
    keyName: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    },
    lastUsed: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Api", apiSchema);