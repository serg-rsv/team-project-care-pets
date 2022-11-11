const { Router } = require('express');

const { controllerNotices } = require('../../controllers');
const { auth } = require('../../middleware');
const { schemaJoiValidator, isValidId } = require('../../validators');
const { schemasJoiNotice } = require('../../models');

const router = Router();

router.post(
  '/',
  auth,
  schemaJoiValidator(schemasJoiNotice.addSchema),
  controllerNotices.addPersonalNotice
);

router.get(
  '/:noticeId/favorites',
  isValidId('noticeId'),
  auth,
  controllerNotices.addToFavorites
);

router.delete(
  '/:noticeId/favorites',
  isValidId('noticeId'),
  auth,
  controllerNotices.deleteFromFavorites
);

router.delete(
  '/:noticeId',
  isValidId('noticeId'),
  auth,
  controllerNotices.deletePersonalNotice
);

router.get('/category/:category', controllerNotices.getByCategory);

router.get('/:noticeId', isValidId('noticeId'), controllerNotices.getById);

router.get('/favorites', auth, controllerNotices.getFavorites);

router.get('/', auth, controllerNotices.getPersonalNotices);

module.exports = router;
