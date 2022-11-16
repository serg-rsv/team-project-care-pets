const asyncHandler = require('express-async-handler');
const { Router } = require('express');

const {
  getNewsListController,
  addNewsController,
} = require('../../controllers/news');

const router = Router();

router.get('/', asyncHandler(getNewsListController));
router.post('/', asyncHandler(addNewsController));

module.exports = router;
