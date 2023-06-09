const {userController} = require('../controllers')
const express = require('express')
const Router = express.Router()

Router.post('/', userController.createUser)

module.exports = Router
