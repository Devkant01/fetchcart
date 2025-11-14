const { uploadOnCloudinary } = require("../../utils/cloudinary.js");
const Product = require("../../models/product.js");

async function editProduct(req, res) {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to edit a product"
            });
        } 
        
        const { title, description, price, category, quantity, seller } = req.body;
        
        if (!title || !description || !price || !category || !quantity || !seller) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        product.title = title;
        product.description = description;
        product.price = price;
        product.category = category;
        product.quantity = quantity;
        product.seller = seller;
        await product.save();
        return res.status(200).json({
            message: "Product updated successfully"
        });
    } catch (error) {
        console.log("Alert! controller/productController~editProduct just knocked");
        res.status(500).json({ message: "Internal server error(Updating product in database)" });
    }
}

module.exports = { editProduct };