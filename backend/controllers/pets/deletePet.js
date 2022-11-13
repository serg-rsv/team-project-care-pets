const asyncHandler = require('express-async-handler');

const { Pet } = require('../../models');
const { RequestError } = require('../../helpers');

const deletePet = asyncHandler(async (req, res) => {
  const { petId } = req.params;
  console.log('mamba', req.params);

  const isRemoved = await Pet.findByIdAndDelete(petId);

  if (!isRemoved) {
    throw RequestError(404, 'Not found');
  }

  res.json({
    code: 200,
    status: 'success',
    message: 'Pet was successfully removed',
  });
});

module.exports = deletePet;
