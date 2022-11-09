const { Router } = require('express');

const { controllerUser } = require('../../controllers');
const { auth } = require('../../middleware');

const router = Router();

router.post('/register', controllerUser.register);

router.post('/login', controllerUser.login);

router.get('/logout', auth, controllerUser.logout);

router.patch('/update', auth, controllerUser.update);

module.exports = router;
