const { deleteFromCloudinary, uploadOnCloudinary } = require('../../utils/cloudinary.js');
const Product = require("../../models/product.js");
const { normalize } = require("../normalize.js");

async function createProduct(req, res) {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to create a product"
            });
        }

        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }

        const { title, description, price, category, subcategory, quantity, seller } = req.body;

        if (!title || !description || !price || !category || !subcategory || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // normalize category and subcategory
        const normalizedCategory = normalize(category);
        const normalizedSubcategory = normalize(subcategory);
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const uploadedImages = [];
        for (const file of req.files) {
            const uploaded = await uploadOnCloudinary(file.buffer, 'fetchcart/products');
            uploadedImages.push(uploaded);
        }

        if(uploadedImages.length === 0) {
            return res.status(500).json({ message: "Failed to upload images" });
        }

        // Create product
        const product = new Product({
            title,
            description,
            price,
            images: uploadedImages.map(img => ({ url: img.url, public_id: img.public_id })),
            category: normalizedCategory,
            subcategory: normalizedSubcategory,
            quantity: Number(quantity),
            seller: seller || req.user.name,
            author: req.user.objectId
        });

        await product.save();

        return res.status(201).json({
            status: "success",
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.log("Alert! controller/product/createProduct just knocked");
        
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}



module.exports = { createProduct };
