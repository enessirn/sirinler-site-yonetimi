const express = require('express');
const { getAllPersons, addPerson, deletePerson } = require('../controller/PersonController');
const router = express.Router();

router.get('/', getAllPersons);
router.post('/add', addPerson);
router.delete('/delete/:id', deletePerson);

module.exports = router;