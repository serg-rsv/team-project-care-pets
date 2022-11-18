const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const getAll = asyncHandler(async (req, res) => {
  const {
    title = '',
    category = '',
    location = '',
    name = '',
    owner = '',
    page = 1,
    limit = 10,
  } = queries;
  const skip = (page - 1) * limit;

  const notices = req.query
    ? await Notice.find(
        {
          title: { $regex: new RegExp(title, 'i') },
          category: { $regex: new RegExp(category, 'i') },
          location: { $regex: new RegExp(location, 'i') },
          name: { $regex: new RegExp(name, 'i') },
          owner: { _id: owner },
        },
        { skip, limit },
        '-createdAt -updatedAt'
      ).populate('owner', 'email phone')
    : await Notice.find({}, { skip, limit }, '-createdAt -updatedAt').populate(
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
