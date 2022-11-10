const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw RequestError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    code: 200,
    status: 'success',
    data: {
      token,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      birthday: user.birthday,
      avatarURL: user.avatarURL,
      pets: user.pets,
      favorites: user.favorites,
    },
  });
});

module.exports = login;
