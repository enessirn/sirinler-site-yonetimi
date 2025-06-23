const express = require('express');
const { getAllPersons, addPerson, deletePerson, addAidat, deleteAidat, resetAllAidats } = require('../controller/PersonController');
const router = express.Router();

router.get('/', getAllPersons);
router.get('/reset-all-aidats', resetAllAidats);
router.post('/add', addPerson);
router.delete('/delete/:id', deletePerson);
router.post('/add-aidat/:id', addAidat)

router.post("/delete-aidat/:id/:aidatId", deleteAidat)
module.exports = router;