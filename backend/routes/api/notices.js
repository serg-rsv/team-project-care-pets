const { Router } = require('express');

const { controllerNotices } = require('../../controllers');
const { auth } = require('../../middleware');
const {
  schemaJoiValidator,
  isValidId,
  isValidCategory,
} = require('../../validators');
const { schemasJoiNotice } = require('../../models');

const router = Router();

router.post(
  '/',
  auth,
  schemaJoiValidator(schemasJoiNotice.addSchema),
  controllerNotices.addPersonalNotice
);

router.get('/', controllerNotices.getAll);

router.get('/personal', auth, controllerNotices.getPersonalNotices);

router.get('/favorites', auth, controllerNotices.getFavorites);

router.get(
  '/favorites/:noticeId',
  isValidId('noticeId'),
  auth,
  controllerNotices.addToFavorites
);

router.delete(
  '/favorites/:noticeId',
  isValidId('noticeId'),
  auth,
  controllerNotices.deleteFromFavorites
);

router.get(
  '/category/:category',
  isValidCategory,
  controllerNotices.getByCategory
);

router.get('/:noticeId', isValidId('noticeId'), controllerNotices.getById);

router.delete(
  '/:noticeId',
  isValidId('noticeId'),
  auth,
  controllerNotices.deletePersonalNotice
);

module.exports = router;
