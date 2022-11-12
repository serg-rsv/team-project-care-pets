const asyncHandler = require('express-async-handler');

const { Notice, User } = require('../../models');
const { RequestError } = require('../../helpers');

const deletePersonalNotice = asyncHandler(async (req, res) => {
  const { noticeId } = req.params;

  // Зачистити ІД в обраних серед юзерів ?
  const users = await User.find({ favorites: noticeId });
  users.forEach(async user => {
    const idx = user.favorites.indexOf(noticeId);
    if (idx === -1) {
      throw RequestError(400, 'Favorite is not found');
    }

    user.favorites.splice(idx, 1);
    await user.save();
  });

  const isRemoved = await Notice.findByIdAndDelete(noticeId);

  if (!isRemoved) {
    throw RequestError(404, 'Not found');
  }

  res.json({
    code: 200,
    status: 'success',
    message: 'Notice is removed',
  });
});

module.exports = deletePersonalNotice;
