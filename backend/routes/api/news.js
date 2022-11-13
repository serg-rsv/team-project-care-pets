const { Router } = require('express');

const {
  getNewsController,
  addNewsController,
} = require('../../controllers/news');

const router = Router();

router.get('/', getNewsController);
router.post('/', addNewsController);

module.exports = router;
