const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const register = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, 'Email in use');
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_JWT);
  await newUser.updateOne({ token });

  res.status(201).json({
    code: 201,
    status: 'success',
    token,
  });
});

module.exports = register;
