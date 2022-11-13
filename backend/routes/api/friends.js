const { Router } = require('express');

const {
  addFriendController,
  getAllFriendsController,
} = require('../../controllers/friends');

const router = Router();

router.get('/', getAllFriendsController);
router.post('/', addFriendController);

module.exports = router;
