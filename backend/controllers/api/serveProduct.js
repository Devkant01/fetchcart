const Product = require("../../models/product");
const { client_url } = require("../../config/config");
const { normalize } = require("../normalize");

async function serveAllProducts(req, res) {
    const { limit } = req.query;
    try {
        const response = await Product.find()
            .select("-author -cloudinary_id -createdAt -updatedAt -__v -_id -images._id");

        const productsWithId = response.map((item, index) => ({
            id: index + 1,
            ...item._doc
        }));

        const limitedList = limit
            ? productsWithId.slice(0, parseInt(limit))
            : productsWithId;

        return res.status(200).json({
            status: "success",
            products: limitedList,
            has_more: limit ? productsWithId.length > parseInt(limit) : false
        });

    } catch (error) {
        console.log("Alert! controller/api/serverProduct~serverAllProducts just knocked");
        res.status(500).json({ message: "Something went wrong while fetching the products" });
    }
}

async function serveProductsCategoryBased(req, res) {
    const category = req.params.category;
    const { limit } = req.query;
    try {
        const normalizedCategory = normalize(category);
        const response = await Product.find({ category: normalizedCategory }).select("-author -cloudinary_id -createdAt -updatedAt -__v -_id");

        if (response.length === 0) {
            return res.status(404).json({
                status: "error",
                message: `No products found under category: ${category}.`,
                hint: "Possibly a spelling mistake — verify your input or check the documentation for valid categories."
            });
        }

        const productsWithId = response.map((item, index) => ({
            id: index + 1,
            ...item._doc
        }));

        const limitedList = limit
            ? productsWithId.slice(0, parseInt(limit))
            : productsWithId;

        return res.status(200).json({
            status: 'success',
            products: limitedList,
            has_more: limit ? productsWithId.length > parseInt(limit) : false
        });

    } catch (error) {
        console.log("Alert! controller/api/serverProduct~serverProductsCategoryBased just knocked");
        res.status(500).json({ status: "error", message: "Something went wrong while fetching the products", errorType: error.message });
    }
}

async function serveProductsSubCategoryBased(req, res) {
    const subcategory = req.params.subcategory;
    const { limit } = req.query;
    try {
        const normalizedSubcategory = normalize(subcategory);
        const response = await Product.find({ subcategory: normalizedSubcategory }).select("-author -cloudinary_id -createdAt -updatedAt -__v -_id");

        if (response.length === 0) {
            return res.status(404).json({
                status: "error",
                message: `No products found under category: ${subcategory}.`,
                hint: "Possibly a spelling mistake — verify your input or check the documentation for valid sub-categories."
            });
        }


        const productsWithId = response.map((item, index) => ({
            id: index + 1,
            ...item._doc
        }));

        const limitedList = limit
            ? productsWithId.slice(0, parseInt(limit))
            : productsWithId;

        return res.status(200).json({
            status: `success`,
            products: limitedList,
            has_more: limit ? productsWithId.length > parseInt(limit) : false
        });

    } catch (error) {
        console.log("Alert! controller/api/serverProduct~serverProductsSubcategoryBased just knocked");
        res.status(500).json({ status: "error", message: "Something went wrong while fetching the products", errorType: error.message });
    }
}

async function wrongRequest(req, res) {
    res.status(400).json({ status: "error", message: "Invalid route. Read documentation for valid endpoints.", link: `${client_url}/docs` });
}

module.exports = {
    serveAllProducts,
    serveProductsCategoryBased,
    serveProductsSubCategoryBased,
    wrongRequest
}