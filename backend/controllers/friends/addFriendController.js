const { addFriend } = require('../../services');

const addFriendController = async (req, res) => {
  const newFriend = await addFriend(req.body);

  res.status(201).json({
    code: 201,
    status: 'success',
    data: newFriend,
  });
};

module.exports = addFriendController;
