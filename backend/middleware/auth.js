const jwt = require('jsonwebtoken')

module.exports = {
    verifyUser: (req, res, next) => {
        console.log('masuk verify user');
        let token = req.headers['authitication']
        console.log('token', token)
        try {
            if (!token) {
                return res.status(401).send('accsess denied1')
            }
            let verifiedUser = jwt.verify(token, 'adminVerification')
            token = token.split(' ')[1]
            if (token === null || !token) {
                return res.status(401).send('accsess denied2')
            }
            if (!verifiedUser) {
                return res.status(401).send('accsess denied3')
            } else {
                req.user = verifiedUser
                next()
            }
        } catch (error) {
            res.send('invalid token')
        }
    },

    checkRole: async (req, res, next) => {
        if (req.user?.role === 'admin') {
            next()
        } else {
            return res.status(401).send('accsess denied')
        }
    }
}
