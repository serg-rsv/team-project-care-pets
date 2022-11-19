const asyncHandler = require('express-async-handler');

const { User } = require('../../models');

const edit = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );

  res.json({
    code: 200,
    status: 'success',
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      birthday: user.birthday,
      avatarURL: user.avatarURL,
      pets: user.pets,
      favorites: user.favorites,
    },
  });
});

module.exports = edit;
