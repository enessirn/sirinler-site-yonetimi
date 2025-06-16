const Transaction = require('../models/Transaction');

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
}

const getAllAmounts = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        const totalIncome = transactions
            .filter(transaction => transaction.type === 'gelir')
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalExpense = transactions
            .filter(transaction => transaction.type === 'gider')
            .reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalAmount = totalIncome - totalExpense;

        res.status(200).json({ totalIncome, totalExpense, totalAmount});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching amounts', error });
    }
}

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error adding transaction', error });
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error });
    }
}

module.exports = { getAllTransactions, addTransaction, deleteTransaction, getAllAmounts };