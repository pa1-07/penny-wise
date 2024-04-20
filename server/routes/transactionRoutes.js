const express = require ('express')
const {addTransaction, getAllTransaction, getDashboardTransaction, editTransaction} = require('../controllers/transactionController')

const router = express.Router()

router.post('/add-transaction', addTransaction)

router.post('/edit-transaction', editTransaction)

router.post('/get-transaction', getAllTransaction)

router.post('/get-dashboard-transaction', getDashboardTransaction)



module.exports = router