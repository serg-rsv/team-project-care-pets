const asyncHandler = require('express-async-handler');

const { Friend } = require('../../models');

const addFriend = asyncHandler(async (req, res) => {
  const newFriend = await Friend.create({ ...req.body });

  res.status(201).json({
    code: 201,
    status: 'success',
    data: newFriend,
  });
});

module.exports = addFriend;
