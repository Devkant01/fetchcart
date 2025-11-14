const express = require("express");
const user = require("./user");
const product = require("./product");
const api = require("./api");

const Router = express.Router();

Router.use('/user', user);
Router.use('/prod', product);
Router.use('/api', api)

module.exports = { Router };