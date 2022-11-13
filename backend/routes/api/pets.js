const { Router } = require('express');

const {
  addPetController,
  deletePetController,
  getOwnerPetsController,
} = require('../../controllers/pets');
const { auth } = require('../../middleware');
const { isValidId, isValidPetFields } = require('../../validators');

const router = Router();

router.get('/', auth, getOwnerPetsController);

router.post('/', auth, isValidPetFields, addPetController);

router.delete('/:petId', isValidId('petId'), auth, deletePetController);

module.exports = router;
