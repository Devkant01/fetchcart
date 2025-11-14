const express = require("express");
const { isAuthorized } = require('../middleware/isAuthorized.js');
const { isValidApi } = require('../middleware/isValidApi.js');
const { rateLimiterMiddleware } = require('../middleware/rateLimiterMiddleware.js');
const { serveAllProducts, serveProductsCategoryBased, serveProductsSubCategoryBased, wrongRequest } = require('../controllers/api/serveProduct.js');
const { upload } = require('../middleware/multerMiddleware.js');
const { editProduct } = require('../controllers/Product/editProduct.js');
const { createProduct} = require('../controllers/product/createProduct.js');
const { deleteProduct } = require('../controllers/Product/deleteProduct.js');
const { getAdminProducts } = require('../controllers/product/getAdminProducts.js');
const { multerErrorHandler } = require("../controllers/product/multerErrorHandler.js");

const app = express.Router();

app.put('/edit-product/:id', isAuthorized, editProduct);
app.delete('/delete-product/:id', isAuthorized, deleteProduct);
app.get('/get-list', isAuthorized, getAdminProducts);
app.post('/add-product', isAuthorized, upload.array('images', 5), multerErrorHandler, createProduct);

app.get("/:apiKey/get-all-products", isValidApi, rateLimiterMiddleware, serveAllProducts);
app.get("/:apiKey/category/:category", isValidApi, rateLimiterMiddleware, serveProductsCategoryBased);
app.get("/:apiKey/subcategory/:subcategory", isValidApi, rateLimiterMiddleware, serveProductsSubCategoryBased);

module.exports = app;