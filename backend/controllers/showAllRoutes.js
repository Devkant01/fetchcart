async function showAllRoutes(req, res) {
    res.status(200).json({
        allRoutes: {
            root: "/",
            baseUrl: "http://localhost:3000/api/v1",
            user: {
                userSignup: "/api/v1/user/signup",
                userSignin: "/api/v1/user/signin",
                userInfo: "/api/v1/user/user-info",
                userLogout: "/api/v1/user/logout",
            },
            products: {
                AddProduct: "/api/v1/prod/add-product",
                getAdminProducts: "/api/v1/prod/get-list",
                deleteProduct: "/api/v1/prod/delete-product/:id",
                updateProductInfo: "/api/v1/prod/edit-product/:id",
            },
            api: {
                deleteUserApiKey: "/api/v1/api/delete-api-key",
                getUserApiKeys: "/api/v1/api/get-api-keys",
                regenerateApiKey: "/api/v1/api/regenerate-api-key",
                generateNewApiKey: "/api/v1/api/generate-new-api-key",
                getAllAvailableProducts: "/api/v1/prod/:apiKey/get-all-products",
                categoryBasedAvailableProducts: "/api/v1/prod/:apiKey/category/:category",
                subcategoryBasedAvailableProducts: "/api/v1/prod/:apiKey/subcategory/:subcategory",
                wrongApiRequest: "/api/v1/prod/:apiKey/:rest",
            },
            globalCatcher: "*"
        }
    });
}

module.exports = { showAllRoutes };