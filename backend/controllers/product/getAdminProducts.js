const { uploadOnCloudinary } = require("../../utils/cloudinary.js");
const Product = require("../../models/product.js");

async function getAdminProducts(req, res) {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to view the products"
            });
        }

        const products = await Product.find({ author: req.user.objectId }).select("-author -__v -createdAt -updatedAt");
        if (products.length === 0) {
            return res.status(200).json({
                message: "No products found for this admin"
            });
        }
        return res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        console.log("Alert! controller/productController~getAdminProducts just knocked");
        res.status(500).json({ message: "Internal server error(Fetching products from database)", products });
    }
}

module.exports = { getAdminProducts };