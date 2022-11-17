const asyncHandler = require('express-async-handler');
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

router.get('/', auth, asyncHandler(getOwnerPetsController));

router.post(
  '/',
  auth,
  upload.single('image'),
  uploadMiddleware,
  isValidPetFields,
  asyncHandler(addPetController)
);

router.delete(
  '/:petId',
  isValidId('petId'),
  auth,
  cleanImgMiddleware,
  asyncHandler(deletePetController)
);

module.exports = router;
