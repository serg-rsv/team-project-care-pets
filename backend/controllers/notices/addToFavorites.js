const asyncHandler = require('express-async-handler');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const addToFavorites = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { noticeId } = req.params;

  const user = await User.findById(_id);
  const isAdded = user.favorites.includes(noticeId);
  if (isAdded) {
    throw RequestError(409, 'Notice is already added.');
  }
  user.favorites.push(noticeId);

  await user.save();

  res.json({
    code: 200,
    status: 'success',
    message: 'Notice is added to favorites',
  });
});

module.exports = addToFavorites;
