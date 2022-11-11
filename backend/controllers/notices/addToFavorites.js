const asyncHandler = require('express-async-handler');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const addToFavorites = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { noticeId } = req.params;

  // v1. find how to push value to array in mongoose
  // await User.findByIdAndUpdate(_id, { favorites: [...user.favorites,noticeId] });

  // v2. try use user from auth
  // req.user.favorites = [...req.user.favorites, noticeId];
  // await req.user.save();

  const user = await User.findById(_id);
  console.log('addToFavorites ~ user', user);
  user.favorites.push(noticeId);

  await user.save();

  res.json({
    code: 200,
    status: 'success',
    // data,
  });
});

module.exports = addToFavorites;
