const { deletePet } = require('../../services');

const deletePetController = async (req, res) => {
  const { petId } = req.params;
  await deletePet(petId);

  const user = res.json({
    code: 200,
    status: 'success',
    message: 'Pet was successfully removed',
  });
};

module.exports = deletePetController;
