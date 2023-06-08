const db = require('../models')
const User = db.User

module.exports = {
    createUser: async (req, res) => {
        try {
            const {userName, password, confirmPassword, role} = req.body
            const findUser = await User.findOne({
                where: {
                    userName: userName
                }
            })
            if(password === confirmPassword && !findUser){
                const result = await User.create({userName, password, role})

                return res.status(200).send({
                    success: true,
                    message: "Register user success",
                    data: result
                })
            }else if(findUser){
                return res.status(400).send({
                    success: false,
                    message: "Username had been registered",
                    data: null
                })
            }else if(password !== confirmPassword){
                return res.status(400).send({
                    success: false,
                    message: "password does not match",
                    data: null
                })
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