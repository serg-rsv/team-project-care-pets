const asyncHandler = require('express-async-handler');

const { User } = require('../../models');
const { RequestError } = require('../../helpers');

const deleteFromFavorites = asyncHandler(async (req, res) => {
  res.json({
    code: 200,
    status: 'success',
    message: 'Notice is deleted from favorites',
  });
});

module.exports = deleteFromFavorites;
