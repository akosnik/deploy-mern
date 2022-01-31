const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const arrayLimit = (arr) => {
  return (arr.length >= 0 && arr.length <= 3)
}

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pet must have a title"],
    unique: [true, "pet name already exists in database"],
    minlength: [2, "pet name must be at least 2 characters"],
  },
  type: {
    type: String,
    required: [true, "pet must have a price"],
    minlength: [3, "pet type must have at least 2 characters"],
  },
  description: {
    type: String,
    required: [true, "pet must have a description"],
    minlength: [3, "pet description must be at least 3 characters"],
  },
  likes: {
    type: Number,
    required: false, 
  },
  
  skills: {
    type: [String],
    required: false,
    validate: [arrayLimit, 'There can be between 0 to 3 skills added']
  },
});


PetSchema.plugin(uniqueValidator)

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
