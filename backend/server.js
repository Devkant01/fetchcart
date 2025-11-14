const express = require("express");
require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Router } = require("./routers/router");
const { connect } = require("./models/connect");
const { client_url } = require("./config/config");
const { showAllRoutes } = require("./controllers/showAllRoutes");

const app = express();
const PORT = 3000;

const normalizedClientUrl = client_url.replace(/\/$/, ''); //prevents from double slashes while concatenating
app.use(cors({
    origin: [
        normalizedClientUrl,
        `${normalizedClientUrl}/`
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version']
}));
app.use(express.json({ limit: "1000kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "1000kb" }));

// routing
app.use('/api/v1', Router);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "hello dev, ready to ROCK!!",
    });
})

app.get('/all-routes', showAllRoutes);

// global catcher
app.use((req, res) => {
    if(req.path.startsWith('/api/v1/')) {
        return res.status(404).json({ status: "error", message: "Invalid API endpoint. Read documentation for valid endpoints.", link: `${client_url}/docs` });
    }
    res.status(404).json({ status: "error", message: "Route not found. Please check the URL." });
})

connect().then((e) => {
    console.log(e);
    // no need to listen when deploying on vercel
    // app.listen(PORT, () => {
    //     console.log(`Server is running: http://localhost:${PORT}`);
    // })
})
    .catch((e) => {
        console.log(e);
    })

module.exports = app;