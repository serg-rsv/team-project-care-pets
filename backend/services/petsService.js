const { Pet } = require('../models');

const addPet = async (petData, owner) => {
  const newPet = await Pet.create({ ...petData, owner });
  return newPet;
};

const getOwnerPets = async owner => {
  const pets = await Pet.find({ owner }, '-createAt -updateAt');
  return pets;
};

const deletePet = async petId => {
  const isRemoved = await Pet.findByIdAndDelete(petId);
  return isRemoved;
};

module.exports = {
  addPet,
  getOwnerPets,
  deletePet,
};
