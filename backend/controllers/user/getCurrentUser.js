const { User } = require('../../models');
const { getOwnerPets } = require('../../services');

const asyncHandler = require('express-async-handler');

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
  }

  res.json({
    status: 'success',
    code: 200,
    user,
  });
});

module.exports = getCurrentUser;
