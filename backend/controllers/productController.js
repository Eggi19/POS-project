const db = require("./../models")
const ProductsDB = db.product

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { page } = req.query
            const offset = (page - 1) * 5
            const result = await ProductsDB.findAll({ limit: 5, offset: offset })
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
    },

    createProduct: async (req, res) => {
        try {
            const { name, categoryId, imageURL, price, status } = req.body
            const getProducts = await ProductsDB.findOne({
                where: {
                    name: name
                }
            })

            if (!getProducts) {
                const result = await ProductsDB.create({
                    name,
                    categoryId,
                    imageURL,
                    price,
                    status
                })

                return res.status(200).send({
                    success: true,
                    message: 'add product success',
                    data: result
                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: `${name} had been added`,
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
