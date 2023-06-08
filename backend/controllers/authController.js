const db = require('../models')
const user = db.user

module.exports = {
    login: async (req, res) => {
        try {
            const { userName, password } = req.body
            let data
            data = await user.findOne({
                where: {
                    userName: userName
                }
            })
            if (!data) {
                return res.status(400).send({
                    succes: false,
                    message: 'username or password invalid',
                    data: []
                })
            } else {
                const validaiton = await bcrypt.compare(password, data?.password);
            }
        } catch (error) {

        }
    }
}