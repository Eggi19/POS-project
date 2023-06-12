const express = require('express')
const Router = express.Router()
const { transactionController } = require('../controllers')

Router.post('/invoices', transactionController.createInvoice)
Router.post('/sales', transactionController.createSale)

module.exports= Router
