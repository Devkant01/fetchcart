const { mongoose } = require("./connect");

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    public_id: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [ImageSchema],
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    subcategory: {
        type: String,
        required: true,
        lowercase: true
    },
    quantity: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema); 