const express = require ('express')
const {addTransaction, getAllTransaction, getDashboardTransaction, editTransaction, deleteTransaction} = require('../controllers/transactionController')

const router = express.Router()

router.post('/add-transaction', addTransaction)

router.post('/edd-transaction', editTransaction)

router.post('/delete-transaction', deleteTransaction)

router.post('/get-transaction', getAllTransaction)

router.post('/get-dashboard-transaction', getDashboardTransaction)



module.exports = router