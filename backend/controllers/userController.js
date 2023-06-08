const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')

module.exports = {
    createUser: async (req, res) => {
        try {
            const {userName, password, confirmPassword, role} = req.body
            const findUser = await User.findOne({
                where: {
                    userName: userName
                }
            })
            console.log(JSON.stringify(findUser));
            if(password === confirmPassword && !findUser && password.length >= 8){
                console.log('masuk');
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const result = await User.create({userName, password: hashPassword, role})

                return res.status(200).send({
                    success: true,
                    message: "Register user success",
                    data: result
                })
            }else if(findUser){
                throw {message: "Username had been registered"}
            }else if(password !== confirmPassword){
                throw {message: "password does not match"}
            }else if(password.length < 8){
                throw {message: "password must include more than 8 characters"}
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}