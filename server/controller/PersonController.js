const Person = require("../models/Person");
const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid")
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
    const newId = uuidv4();
    const personAidat = await Person.findByIdAndUpdate(
      personId,
      {
        $set: {
          "aidat": true,
          "date": date,
          "aidatId": newId
        }
      },
      { new: true }
    );

    // update transaction
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    if (!personAidat) return res.status(404).json({ message: "Kişi bulunamadı" })
    const newTransaction = new Transaction({
      "title": "Aidat Ödemesi",
      "desc": `${personAidat.fullName} ${months[date.getMonth()]} Ayı Aidat Ödemesi`,
      "amount": 200,
      "date": new Date(),
      "type": true,
      "aidatId": newId
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
const deleteAidat = async (req, res) => {
  try {
    const { id, aidatId } = req.params;
    console.log("id", id, "aidatId", aidatId);
    if (!aidatId) return res.status(500).json({ message: "Aidat Id bulunamadı" })
    if (!id) return res.status(500).json({ message: "Kişi Bulunamadı" })
    const personAidat = await Person.findByIdAndUpdate(
      id,
      {
        $set: {
          "aidat": false,
          "date": null

        }
      },
      { new: true }
    );



    // transactions delete fo the aidat 
    const findTransaction = await Transaction.findOne({aidatId: aidatId});
    console.log("findTransaction", findTransaction);
    if (!findTransaction) return res.status(404).json({ message: "Aidat Id bulunamadı" })
    await Transaction.findByIdAndDelete(findTransaction._id);
    res.status(200).json({
      message: "Aidat ve işlem kaydı başarıyla silindi.",
      personAidat
    });
  } catch (error) {
    res.status(500).json({ message: "Error when uptade the person's aidat", error });
  }
}

const resetAllAidats = async (req, res) => {
  try {
    const resetAidats = await Person.updateMany(
      {},
      {
        $set: {
          aidat: false,
          date: null,
          aidatId: null
        },
      }
    );
    res.status(200).json({ message: "Tüm aidat bilgileri sıfırlandı." });
    await resetAidats.save();
  } catch (error) {
    res.status(500).json({ message: "Bir hata oluştu", error });
  }
}
module.exports = {
  getAllPersons,
  addPerson,
  deletePerson,
  addAidat,
  deleteAidat,
  resetAllAidats
};