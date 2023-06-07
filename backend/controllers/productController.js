const db = require("./../models")
const ProductsDB = db.product
const { Op } = require("sequelize");

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { page, category, search, sort, nameSort } = req.query

            const offset = (page - 1) * 5
            let result
            console.log('masuksort ', sort)
            let where = undefined
            let order = undefined

            if (search) {
                where = {}
                where.name = { [Op.like]: `%${search}%` }
            }
            if (category !== '0') {
                where = {}
                console.log('masuk cat + search')
                where.categoryId = category
            }

            if (sort !== 'null') {
                console.log('ttp masuk ke sort>>>');
                if (nameSort === '1') {
                    order = [
                        ['name', `${sort}`]
                    ]

                } else {
                    order = [
                        ['price', `${sort}`]
                    ]
                }
            } else {
                order = [['id', 'ASC']]
            }

            result = await ProductsDB.findAll({
                limit: 10, offset: offset,
                where: where,
                order: order
            })

            console.log('masuk ')
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
