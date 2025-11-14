const multer = require('multer');

// Custom multer error handler
function multerErrorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                status: "error",
                message: "Image size must be less than 5MB"
            });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                status: "error",
                message: "Too many images — maximum 5 allowed"
            });
        }
    }
    next(err);
}

module.exports = {
    multerErrorHandler
};