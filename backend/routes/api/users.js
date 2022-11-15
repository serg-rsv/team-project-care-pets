const { Router } = require('express');

const { controllerUser } = require('../../controllers');
const { auth, uploadMiddleware, upload } = require('../../middleware');
const { schemaJoiValidator } = require('../../validators');
const { schemasJoiUser } = require('../../models');

const router = Router();

router.post(
  '/register',
  schemaJoiValidator(schemasJoiUser.registerSchema),
  controllerUser.register
);

router.post(
  '/login',
  schemaJoiValidator(schemasJoiUser.loginSchema),
  controllerUser.login
);

router.get('/logout', auth, controllerUser.logout);

router.patch('/edit', auth, controllerUser.edit);

router.patch(
  '/avatars',
  auth,
  upload.single('image'),
  uploadMiddleware,
  controllerUser.addAvatar
);

module.exports = router;
