const db = require('../models')
const Invoice = db.Invoice
const Sale = db.Sale

module.exports = {
    createInvoice: async (req, res) => {
        try {
            const {userId, total, paymentType} = req.body

            const result = await Invoice.create({userId, total, paymentType})

            if(result){
                res.send({
                    success: true,
                    message: "Create Invoice Success",
                    data: result
                })
            }else{
                throw {message: "Create Invoice Failed"}
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
                data: null
            })
        }
    },

    createSale: async (req, res) => {
        try {
            const {invoiceId, productId, quantity, subTotal} = req.body
            const result = await Sale.create({invoiceId, productId, quantity, subTotal})

            if(result){
                res.send({
                    success: true,
                    message: "Create Sale Success",
                    data: result
                })
            }else{
                throw {message: "Create Sale Failed"}
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