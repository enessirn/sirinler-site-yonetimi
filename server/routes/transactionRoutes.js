const express = require('express');
const { getAllTransactions, addTransaction, deleteTransaction, getAllAmounts } = require('../controller/transactionController');
const router = express.Router();

router.get('/', getAllTransactions);
router.post('/add', addTransaction);
router.delete('/delete/:id', deleteTransaction);

router.get('/amounts', getAllAmounts);
module.exports = router;
