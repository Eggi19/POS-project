const productController = require('./productController')
const userController = require('./userController')
const categoryController = require('./categoryController')
const authController = require('./authController')
const transactionController = require('./transactionController')
const reportController = require('./reportController')

module.exports= {
    categoryController,
    productController,
    userController,
    authController,
    transactionController,
    reportController
}
