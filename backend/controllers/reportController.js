const db = require("./../models")
const InvoiceDB = db.invoice
const { Op, fn, Sequelize } = require("sequelize");



module.exports = {
    getReport: async (req, res) => {
        try {
            const { startDate, endDate } = req.query
            console.log('date', startDate, endDate);
            const invoice = await InvoiceDB.findAll({
                order: [
                    ['createdAt', 'ASC']],
                attributes: [
                    'createdAt',
                    [Sequelize.fn('SUM', Sequelize.col('total')), 'sum_total'],
                ],
                where: {
                    createdAt: {
                        [Op.between]: [new Date(startDate), new Date(endDate)]
                    }
                },
                group: ['createdAt']

            })
            console.log('invoice', invoice);

            let start = new Date(startDate)
            let end = new Date(endDate)

            let currentDate = start
            // while (currentDate <= end) {
            //     console.log(currentDate)
            //     for( let i =0; i < invoice.data.length; i++ ) {
            //     if (currentDate.toString().split('T'[0]) === start.split('T', [0])) {

            //     }

            //     //update date 
            //     currentDate.setDate(currentDate.getDate() + 1)
            // }


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