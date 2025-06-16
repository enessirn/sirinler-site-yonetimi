const express = require('express');
const { getAllPersons, addPerson, deletePerson, addAidat } = require('../controller/PersonController');
const router = express.Router();

router.get('/', getAllPersons);
router.post('/add', addPerson);
router.delete('/delete/:id', deletePerson);
router.post('/add-aidat/:id', addAidat)
module.exports = router;