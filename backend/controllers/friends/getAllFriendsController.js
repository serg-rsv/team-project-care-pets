const asyncHandler = require('express-async-handler');
const { Friend } = require('../../models');

const getAllFriends = asyncHandler(async (req, res) => {
  const friends = await Friend.find({}, '-createAt -updateAt');
  res.json({
    code: 200,
    status: 'success',
    data: friends,
  });
});

module.exports = getAllFriends;
