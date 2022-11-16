const { getFriendsList } = require('../../services');

const getFriendsListController = async (_, res) => {
  const friends = await getFriendsList();

  res.json({
    code: 200,
    status: 'success',
    data: friends,
  });
};

module.exports = getFriendsListController;
