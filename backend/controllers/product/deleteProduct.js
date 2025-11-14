const { deleteFromCloudinary } = require("../../utils/cloudinary.js");
const Product = require("../../models/product.js");

async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied: You are not authorized to delete a product"
            });
        }

        const response = await Product.findByIdAndDelete(id);
        // delete from cloudinary 
        await deleteFromCloudinary(response.cloudinary_id);
        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = { deleteProduct };