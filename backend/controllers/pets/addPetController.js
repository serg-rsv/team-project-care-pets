const { addPet } = require('../../services');

const addPetController = async (req, res) => {
  const { _id } = req.user;
  
  const newPet = await addPet(req.body, _id);

  res.status(201).json({
    code: 201,
    status: 'success',
    data: newPet,
  });
};

module.exports = addPetController;
