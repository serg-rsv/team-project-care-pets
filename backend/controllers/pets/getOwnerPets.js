const asyncHandler = require('express-async-handler');
const { Pet } = require('../../models');

const getOwnerPets = asyncHandler(async ({ user: { _id } }, res) => {
  const pets = await Pet.find({ owner: _id }, '-createAt -updateAt');
  res.json({
    code: 200,
    status: 'success',
    data: pets,
  });
});

module.exports = getOwnerPets;
