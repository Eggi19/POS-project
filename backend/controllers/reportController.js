const db = require("./../models")
const InvoiceDB = db.invoice
const { Op } = require("sequelize");

module.exports = {
    getReport: async (req, res) => {
        try {
            const { startDate, endDate } = req.query
            const invoice = await InvoiceDB.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            })

            let start = new Date(startDate)
            let end = new Date(endDate)

            let currentDate = start
            while (currentDate <= end) {
                console.log(currentDate)
                if (currentDate.split('T07'[0]) === start.split('T07', [0])) {

                }

                //update date 
                currentDate.setDate(currentDate.getDate() + 1)
            }


            // console.log('date minus', endDate - startDate)

            // for(let i = 0; i < invoice.)

            // console.log('invoice', invoice)
            return res.status(200).send({
                success: true,
                message: 'get report success',
                data: invoice
            })
        } catch (error) {
            if (!error) {
                res.send({
                    message: 'no response form server'
                })
            } else {
                res.send({
                    success: false,
                    message: error.message,
                    data: []
                })
            }
        }

    }

}