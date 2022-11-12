const { Router } = require('express');

const { controllerPets } = require('../../controllers');
const { auth } = require('../../middleware');
const { schemaJoiValidator } = require('../../validators');
const { schemasJoiUser } = require('../../models');

const router = Router();

router.get(
  '/',
  schemaJoiValidator(schemasJoiUser.registerSchema),
  controllerUser.register
);

router.post(
  '/',
  schemaJoiValidator(schemasJoiUser.loginSchema),
  controllerUser.login
);

router.delete('/:petID', auth, controllerUser.logout);

module.exports = router;
