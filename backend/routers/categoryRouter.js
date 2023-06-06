const {categoryController} = require('../controllers')
const express = require('express')
const Router = express.Router()

Router.get('/', categoryController.getCategories)
Router.post('/', categoryController.createCategory)
Router.put('/:categoryId', categoryController.modifyCategory)

module.exports = Router
