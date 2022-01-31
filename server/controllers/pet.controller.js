const Pet = require("../models/pet.model");

module.exports.getAllPets = (req, res) => {
  Pet.find()
    .then((allPets) => {
      res.json({ results: allPets });
    })
    .catch((err) => {
      res.json({ message: "There was an error while getting all pets", error: err });
    });
};

module.exports.getSinglePet = (req, res) => {
  Pet.findOne({ _id: req.params.id })
    .then((singlePet) => {
      res.json({ results: singlePet });
    })
    .catch((err) => {
      res.json({ message: 'There was an error while getting a single pet', error: err})
    });
};

module.exports.editSinglePet = (req, res) => {
  Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then((updatedPet) => {
      res.json({ results: updatedPet })
    })
    .catch((err) => {
      res.json({ message: 'There was an error while editing a single pet', error: err})
    })
}

module.exports.deleteSinglePet = (req, res) => {
  Pet.deleteOne({ _id: req.params.id })
    .then((deletedPet) => {
      res.json({ results: deletedPet });
    })
    .catch((err) => {
      res.json({ message: 'There was an error while deleting a pet', error: err})
    });
};

module.exports.createPet = (req, res) => {
  Pet.create(req.body)
    .then((newPet) => {
      res.json({ results: newPet });
    })
    .catch((err) => {
      res.json({ message: 'There was an error while creating a pet', error: err})
    });
};

module.exports.addLike = (req, res) => {
  Pet.findOneAndUpdate({ _id: req.params.id }, {
    $inc : {'likes' : 1}
  })
    .then(updatedPet => {
      res.json({ results: updatedPet })
    })
    .catch((err) => {
      res.json({ message: 'There was an error while updating likes', error: err})
    })
}