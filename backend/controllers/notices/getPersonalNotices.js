const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');

const getPersonalNotices = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find({ owner: _id }, '-createdAt -updatedAt', {
    skip,
    limit,
  });

  res.json({
    code: 200,
    status: 'success',
    data: notices,
  });
});

module.exports = getPersonalNotices;
