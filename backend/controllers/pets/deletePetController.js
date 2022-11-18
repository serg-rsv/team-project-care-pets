const { deletePet } = require('../../services');
const { RequestError } = require('../../helpers');

const deletePetController = async (req, res) => {
  const { petId } = req.params;
  const isRemoved = await deletePet(petId);

  if (!isRemoved) {
    throw RequestError(404, 'Pet Not found');
  }

  res.json({
    code: 200,
    status: 'success',
    message: 'Pet was successfully removed',
  });
};

module.exports = deletePetController;
