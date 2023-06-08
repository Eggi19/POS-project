const db = require("./../models")
const ProductsDB = db.product
const { Op } = require("sequelize");

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { page, category, search } = req.query

            const offset = (page - 1) * 5
            let result
            console.log('masuk ', search)
            let where = undefined

            if (search) {
                where = {}
                where.name = { [Op.like]: `%${search}%` }
            }
            if (category !== '0') {
                where = {}
                console.log('masuk cat + search')
                where.categoryId= category
            }

            result = await ProductsDB.findAll({
                limit: 10, offset: offset,
                where: where
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
    },

    updateProduct: async(req, res) => {
        try {
            const {productId} = req.params
            const { name, categoryId, imageURL, price, status } = req.body

            const findProduct = await ProductsDB.findOne({
                where: {
                    id: productId
                }
            })

            if(findProduct){
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
            }else{
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

    deleteProduct: async(req, res) => {
        try {
            const {productId} = req.params
            const findProduct = await ProductsDB.findOne({
                where: {
                    id: productId
                }
            })

            if(findProduct){
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
            }else{
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

    getProductsWithCategory: async(req, res) => {
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
