const db = require("./../models")
const ProductsDB = db.product
const { Op } = require("sequelize");

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { page, category, search, sort, nameSort } = req.query
            const limit = 10
            const offset = (page - 1) * limit
            let result
            let where = undefined
            let order = undefined
            let orderType = ''
            const response = await ProductsDB.count()
            let totalPage = Math.ceil(response / limit)
            console.log("total", nameSort);

            if (nameSort === '1') {
                orderType = 'name'
            } else if (nameSort === '2') {
                orderType = 'price'
            }

            if (search) {
                where = {}
                where.name = {
                    [Op.like]: `%${search}%`,

                }
            }
            if (category !== '0') {
                where = {}
                console.log('masuk cat + search')
                where.categoryId = category
            }
            console.log('sort', sort)
            if (sort !== "null") {

                order = [[`${orderType}`, `${sort}`]]
            } else {
                order = [['id', 'ASC']]
            }
            result = await ProductsDB.findAll({
                limit: limit, offset: offset,
                where: where,
                order: order

            })
            console.log('masuk ', result.length)
            // console.log('masuk ')
            // console.log(result)
            if (result.length > 0) {
                return res.status(200).send({
                    success: true,
                    message: 'get products success',
                    page: totalPage,
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
