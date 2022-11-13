const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const getAll = asyncHandler(async (req, res) => {
  const notices = await Notice.find({}, '-createdAt -updatedAt').populate(
    'owner',
    'email phone'
  );

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
