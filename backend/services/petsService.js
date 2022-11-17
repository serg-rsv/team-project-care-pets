const { Pet } = require('../models');

const addPet = async (petData, owner) => {
  console.log('petData', petData);
  console.log('petData', owner);

  const newPet = await Pet.create({ ...petData, owner });
  return newPet;
};

const getOwnerPets = async owner => {
  const pets = await Pet.find({ owner }, '-createAt -updateAt');
  return pets;
};

const deletePet = async petId => {
  await Pet.findByIdAndDelete(petId);
};

module.exports = {
  addPet,
  getOwnerPets,
  deletePet,
};
