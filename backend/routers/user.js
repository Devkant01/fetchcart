const express = require("express");
const { isAuthorized } = require("../middleware/isAuthorized.js");
const { signinController, signupController, logoutController, userController } = require("../controllers/user/userAuthController.js");
const { adminRequest } = require("../controllers/user/adminRequest.js");

const app = express.Router();

app.post('/signup', signupController); //no need to authorize user
app.post('/signin', signinController);

app.get('/user-info', isAuthorized, userController); // verifying token validity & getting user-info for  persistent login
app.get('/logout', isAuthorized, logoutController);

app.put('/become-admin', isAuthorized, adminRequest);

module.exports = app;