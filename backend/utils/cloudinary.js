// utils/cloudinary.js
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");
const { cloud_name, api_key, api_secret } = require("../config/config");

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
});

function uploadOnCloudinary(fileBuffer, folder = "fetchcart/products") {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "auto" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
}

async function deleteFromCloudinary(public_id) {
    try {
        if (!public_id) return null;
        return await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.log("Cloudinary delete error:", error.message);
        return null;
    }
}

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
