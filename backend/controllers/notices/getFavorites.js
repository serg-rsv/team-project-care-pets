const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const getFavorites = asyncHandler(async (req, res) => {
  res.json({
    code: 200,
    status: 'success',
    // data,
  });
});

module.exports = getFavorites;
