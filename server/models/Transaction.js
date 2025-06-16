const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, default: '' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['gelir', 'gider'], required: true },
    aidatId : {type: String, default: null}
});

module.exports = mongoose.model('Transaction', TransactionSchema);

