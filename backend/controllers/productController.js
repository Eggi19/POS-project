const db = require("./../models")
const ProductsDB = db.product

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { page } = req.query
            const offset = (page - 1) * 5
            const result = await ProductsDB.findAll({ limit: 10, offset: offset })
            console.log(result)
            if (result.length > 0) {
                return res.status(200).send({
                    success: true,
                    message: 'get products success',
                    data: result
                })
            } else {
                res.status(404).send({
                    success: true,
                    message: 'products not found',
                    data: {}
                })
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
