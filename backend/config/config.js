module.exports = {
    client_url: process.env.CLIENT_URL,
    jwt_key: process.env.JWT_SECRET_KEY,
    salt_rounds: process.env.SALT_ROUNDS,
    admin_psw: process.env.ADMIN_PASSWORD,
    api_key: process.env.CLOUDINARY_API_KEY,
    db_connection: process.env.DB_CONNECTION,
    node_env: process.env.NODE_ENVIRONMENT,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};