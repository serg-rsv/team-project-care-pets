const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const getAll = asyncHandler(async (req, res) => {
  const notices = await Notice.find({}, '-createdAt -updatedAt');

  if (!notices) {
    throw RequestError(404, 'Not found');
  }

  res.json({
    code: 200,
    status: 'success',
    data: notices,
  });
});

module.exports = getAll;
