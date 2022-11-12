const { Router } = require('express');

const { controllerPets } = require('../../controllers');
const { auth } = require('../../middleware');
const { schemaJoiValidator } = require('../../validators');
const { schemasJoiUser } = require('../../models');

const router = Router();

router.get('/');

router.post('/');

router.delete('/:petID');

module.exports = router;
