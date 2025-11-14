const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
    points: 15, // Number of requests
    duration: 3600, // Per hour (in seconds)
});

async function rateLimiterMiddleware(req, res, next){
    try {
        const apiKey = req.params.apiKey;
        await rateLimiter.consume(apiKey);
        next();
    } catch (error) {
        console.log("Alert! middleware/rateLimiterMiddleware just knocked");
        res.status(429).json({
            status: "error",
            message: "Too many requests. Please try again later."
        });
    }
};

module.exports = { rateLimiterMiddleware };