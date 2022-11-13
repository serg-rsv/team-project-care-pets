const asyncHandler = require('express-async-handler');

const { Pet } = require('../../models');

const addPet = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const newPet = await Pet.create({ ...req.body, owner: _id });

  res.status(201).json({
    code: 201,
    status: 'success',
    data: newPet,
  });
});

module.exports = addPet;
