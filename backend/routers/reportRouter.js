const express = require('express');
const { reportController } = require('../controllers');
const Router = express.Router()

Router.get('/', reportController.getReport);
Router.get('/orderlists', reportController.getOrderList);

module.exports = Router;