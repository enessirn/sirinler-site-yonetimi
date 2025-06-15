const mongoose = require('mongoose');

const Person = new mongoose.Schema({
    fullName: { type: String, required: true },
    aidat: { type: Boolean, default: false },
    date: { type: Date, default: null },
});



module.exports = mongoose.model('Person', Person);