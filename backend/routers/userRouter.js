const {userController} = require('../controllers')
const express = require('express')
const Router = express.Router()

Router.post('/', userController.createUser)
Router.get('/', userController.getUserData)

module.exports = Router
