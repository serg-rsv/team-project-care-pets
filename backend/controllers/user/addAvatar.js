const asyncHandler = require('express-async-handler');

const { User } = require('../../models');

const addAvatar = asyncHandler(async (req, res) => {
  res.json({
    code: 200,
    status: 'success',
    message: 'Not implemented yet',
  });
});

module.exports = addAvatar;
