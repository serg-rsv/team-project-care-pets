const asyncHandler = require('express-async-handler');

const { RequestError } = require('../../helpers');

const deleteFromFavorites = asyncHandler(async (req, res) => {
  const { user } = req;
  const { noticeId } = req.params;

  const idx = user.favorites.indexOf(noticeId);
  if (idx === -1) {
    throw RequestError(400, 'Favorite is not found');
  }

  user.favorites.splice(idx, 1);
  await user.save();

  res.json({
    code: 200,
    status: 'success',
    message: 'Notice is deleted from favorites',
  });
});

module.exports = deleteFromFavorites;
