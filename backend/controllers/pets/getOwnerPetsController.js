const { getOwnerPets } = require('../../services');

const getOwnerPetsController = async ({ user: { _id } }, res) => {
  const pets = await getOwnerPets(_id);

  res.json({
    code: 200,
    status: 'success',
    data: pets,
  });
};

module.exports = getOwnerPetsController;
