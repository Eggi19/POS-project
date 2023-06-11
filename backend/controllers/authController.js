const { ValidationError } = require('sequelize')
const db = require('../models')
const user = db.User
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {
        try {
            console.log('masuk BE login')
            const { userName, password } = req.body
            const data = await user.findOne({
                where: {
                    userName: userName
                }
            })
            if (!data) {
                console.log("masuk !data");
                throw { message: 'username or password invalid' }
            } else {
                // console.log('masuk validation');
                let validaiton = await bcrypt.compare(password, data?.password);
                // console.log('validation', validaiton)
                if (validaiton) {
                    // console.log('masuk validation if')
                    let payload = { userName, role: data.role }
                    console.log('payload', payload)
                    const token = jwt.sign(payload, 'adminVerification', { expiresIn: '1h' })
                    return res.status(200).json({
                        token: token,
                        success: true,
                        message: 'login success',
                        data: data
                    })
                } else {
                    // console.log('masuk validation else');
                    throw { message: 'username or password invalid' }
                }
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: []
            })
        }
    }
}
