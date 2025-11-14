const express = require("express");
const { isAuthorized } = require('../middleware/isAuthorized.js');
const { getApiKeys, generateNewApiKey, deleteApiKey } = require('../controllers/User/apiController.js');

const app = express.Router();

app.get("/get-api-key", isAuthorized, getApiKeys);
app.post('/generate-new-api-key', isAuthorized, generateNewApiKey);
app.post('/regenerate-api-key', isAuthorized, generateNewApiKey);
app.delete('/delete-api-key', isAuthorized, deleteApiKey);



module.exports = app;