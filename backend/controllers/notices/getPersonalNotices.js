const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const getPersonalNotices = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const notices = await Notice.find({ owner: _id }, '-createdAt -updatedAt');

  res.json({
    code: 200,
    status: 'success',
    data: notices,
  });
});

module.exports = getPersonalNotices;
