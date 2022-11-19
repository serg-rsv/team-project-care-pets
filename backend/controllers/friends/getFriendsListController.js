const { getFriendsList } = require('../../services');

const getFriendsListController = async (req, res) => {
  const friends = await getFriendsList(req.query);

  res.json({
    code: 200,
    status: 'success',
    data: friends,
  });
};

module.exports = getFriendsListController;
