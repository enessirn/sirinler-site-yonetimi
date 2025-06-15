const Person = require("../models/Person");

 const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching persons", error });
  }
}

 const addPerson = async (req, res) =>  {
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

module.exports = {
  getAllPersons,
  addPerson,
  deletePerson
};