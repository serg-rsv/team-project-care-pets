const { Router } = require('express');

const {
  addPetController,
  deletePetController,
  getOwnerPetsController,
} = require('../../controllers/pets');
const {
  auth,
  uploadMiddleware,
  upload,
  cleanImgMiddleware,
} = require('../../middleware');
const { isValidId, isValidPetFields } = require('../../validators');

const router = Router();

router.get('/', auth, getOwnerPetsController);

router.post(
  '/',
  auth,
  upload.single('image'),
  uploadMiddleware,
  isValidPetFields,
  addPetController
);

router.delete(
  '/:petId',
  isValidId('petId'),
  auth,
  cleanImgMiddleware,
  deletePetController
);

module.exports = router;
