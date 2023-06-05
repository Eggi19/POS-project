const db = require('../models')
const Category = db.Category

module.exports = {
    getCategories: async(req, res) => {
        try {
            const result = await Category.findAll()
            
            return res.status(200).send({
                success: true,
                message: 'get category success',
                data: result
            })
        } catch (error) {
            
        }
    },

    createCategory: async(req, res) => {
        try {
            const {name} = req.body
            const getCategories = await Category.findOne({
                where: {
                    name: name
                }
            })

            if(!getCategories){
                const result = await Category.create({name})
            
                return res.status(200).send({
                    success: true,
                    message: 'add category success',
                    data: result
                })
            }else{
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

    modifyCategory: async(req, res) => {
        try {
            const {categoryId} = req.params
            const {name} = req.body

            const getCategories = await Category.findOne({
                where: {
                    id: categoryId
                }
            })

            if(getCategories){
                const result = await Category.update({name}, {
                    where: {
                        id: categoryId
                    }
                })

                return res.status(200).send({
                    success: true,
                    message: 'modify category success',
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
    }
}
