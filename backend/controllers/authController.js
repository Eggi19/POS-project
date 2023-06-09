const { ValidationError } = require('sequelize')
const db = require('../models')
const user = db.User
const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {
        try {
            console.log('masuk BE login')
            const { userName, password } = req.body
            console.log('...>>', userName, password)
            // let data
            // let validation
            const data = await user.findOne({
                where: {
                    userName: userName
                }
            })
            console.log(data)

            if (!data) {
                console.log("masuk !data");
                throw { message: 'username or password invalid' }
            } else {
                console.log('masuk validation');
                let validaiton = await bcrypt.compare(password, data?.password);
                console.log('validation', validaiton)
                if (validaiton) {
                    console.log('masuk validation if')
                    return res.status(200).send({
                        success: true,
                        message: 'login success',
                        data: data
                    })
                } else {
                    console.log('masuk validation else');
                    throw { message: 'username or password invalid' }
                    // res.status(401).send({
                    //     succes: false,
                    //     message: 'username or password invalid',
                    //     data: []
                    // })
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
