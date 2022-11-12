const asyncHandler = require('express-async-handler');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const getFavorites = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).populate('favorites');

  res.json({
    code: 200,
    status: 'success',
    data: user.favorites,
  });
});

module.exports = getFavorites;
