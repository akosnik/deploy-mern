
const PetController = require("../controllers/pet.controller");

module.exports = function (app) {

  app.get("/api/pets", PetController.getAllPets);

  app.post("/api/pets", PetController.createPet);

  app.get("/api/pets/:id", PetController.getSinglePet);

  app.put("/api/pets/:id", PetController.editSinglePet);

  app.put("/api/pets/likes/:id", PetController.addLike);

  app.delete("/api/pets/:id", PetController.deleteSinglePet);


};
