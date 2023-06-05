const express = require('express')
const { productController } = require('../controllers')
const Router = express.Router()

Router.get('/products', productController.getProduct)

module.exports = Router
