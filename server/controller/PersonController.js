const Person = require("../models/Person");
const Transaction = require("../models/Transaction")
const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching persons", error });
  }
}

const addPerson = async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(500).json({ message: "Error adding person", error });
  }
}

const deletePerson = async (req, res) => {
  try {
    const personId = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personId);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting person", error });
  }
}

const addAidat = async (req, res) => {
  try {
    const personId = req.params.id;
    const date = new Date();
    if (!personId) return res.status(500).json({ message: "Kişi Bulunamadı" })
    const personAidat = await Person.findByIdAndUpdate(
      personId,
      {
        $set: {
          "aidat": true,
          "date": date

        }
      },
      { new: true }
    );

    // update transaction
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    const getPerson = await Person.findById(personId);
    if(!getPerson) return res.status(500).json({message: "Kişi bulunamadı"})
    const newTransaction = new Transaction({
      "title": "Aidat Ödemesi",
      "desc": `${getPerson.fullName} ${months[date.getMonth()]} Ayı Aidat Ödemesi`,
      "amount": 200,
      "date": new Date(),
      "type": "gelir"

    })
    await newTransaction.save();
    res.status(201).json({
      message: "Aidat güncellendi",
      updatedPerson: personAidat,
      transaction: newTransaction
    });
  } catch (error) {
    res.status(500).json({ message: "Error when uptade the person's aidat", error });
  }
}

module.exports = {
  getAllPersons,
  addPerson,
  deletePerson,
  addAidat
};