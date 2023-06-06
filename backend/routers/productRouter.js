const express = require('express')
const Router = express.Router()
const { productController } = require('../controllers')

Router.get('/', productController.getProduct)
Router.post('/', productController.createProduct)

module.exports = Router
