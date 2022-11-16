const asyncHandler = require('express-async-handler');
const { User } = require('../../models');

const changeAvatar = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const photoURL = req.photo.photoURL;
  const photoId = req.photo.photoId;

  await User.findByIdAndUpdate(_id, { photoURL, photoId });

  res.json({
    code: 200,
    status: 'success',
    message: 'Avatar changed',
    photoURL,
  });
});

module.exports = changeAvatar;
