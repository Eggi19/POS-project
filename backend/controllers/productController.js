const db = require("./../models")
const ProductsDB = db.product
const { Op } = require("sequelize");

module.exports = {
    getProduct: async (req, res) => {
        try {

            const { page, category, search, sort, nameSort, limit } = req.query
            // const limit = 10
            const pageLimit = Number(limit)
            const offset = (page - 1) * pageLimit
            let result
            let where = undefined
            let order = undefined
            let orderType = ''
            const response = await ProductsDB.count()
            let totalPage = Math.ceil(response / pageLimit)
            console.log("total", totalPage);

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
                include: db.Category,
                limit: pageLimit, offset: offset,
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
    },

    createProduct: async (req, res) => {
        try {
            const { name, categoryId, imageURL, price, status } = req.body
            const getProducts = await ProductsDB.findOne({
                where: {
                    name: name
                }
            })

            if (name && categoryId && imageURL && price && status) {
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
            }else{
                return res.status(400).send({
                    success: false,
                    message: `complete your form`,
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
    },

    updateProduct: async (req, res) => {
        try {
            const { productId } = req.params
            const { name, categoryId, imageURL, price, status } = req.body

            const findProduct = await ProductsDB.findOne({
                where: {
                    id: productId
                }
            })

            if (findProduct) {
                const result = await ProductsDB.update({
                    name,
                    categoryId,
                    imageURL,
                    price,
                    status
                }, {
                    where: {
                        id: productId
                    }
                })

                return res.status(200).send({
                    success: true,
                    message: 'update product success',
                    data: result
                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: `category's id is not found`,
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
    },

    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params
            const findProduct = await ProductsDB.findOne({
                where: {
                    id: productId
                }
            })

            if (findProduct) {
                const result = await ProductsDB.destroy({
                    where: {
                        id: productId
                    }
                })

                return res.status(200).send({
                    success: true,
                    message: 'delete product success',
                    data: result
                })
            } else {
                return res.status(400).send({
                    success: false,
                    message: `category's id is not found`,
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
    },

    getProductsWithCategory: async (req, res) => {
        try {
            const result = await ProductsDB.findAll({
                include: db.Category
            })

            res.status(200).send({
                success: true,
                message: "success",
                data: result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}
