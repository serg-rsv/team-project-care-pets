const asyncHandler = require('express-async-handler');
const { Router } = require('express');

const {
  addFriendController,
  getFriendsListController,
} = require('../../controllers/friends');

const router = Router();

router.get('/', asyncHandler(getFriendsListController));
router.post('/', asyncHandler(addFriendController));

module.exports = router;
