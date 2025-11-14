const { mongoose } = require("./connect");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true, // cheaper to the queries search
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "password is required"], // message to frontend
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);