const express = require('express')
const Router = express.Router()
const { productController } = require('../controllers')

Router.get('/', productController.getProduct)
Router.post('/', productController.createProduct)
Router.put('/:productId', productController.updateProduct)
Router.delete('/:productId', productController.deleteProduct)
Router.get('/category', productController.getProductsWithCategory)

module.exports = Router
