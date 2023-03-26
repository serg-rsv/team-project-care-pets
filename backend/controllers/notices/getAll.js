const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const getAll = asyncHandler(async (req, res) => {
  const {
    title = '',
    category = '',
    location = '',
    name = '',
    page = 1,
    limit = 12,
  } = req.query;
  const skip = (page - 1) * limit;

  const notices =
    title || category || location || name
      ? await Notice.find(
          {
            title: { $regex: new RegExp(title, 'i') },
            category: { $regex: new RegExp(category, 'i') },
            location: { $regex: new RegExp(location, 'i') },
            name: { $regex: new RegExp(name, 'i') },
          },
          '-createdAt -updatedAt'
          // { skip, limit }
        )
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('owner', 'email phone')
      : await Notice.find(
          {},
          '-createdAt -updatedAt'
          //   , {
          //     skip,
          //     limit,
          // }
        )
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('owner', 'email phone');

  if (!notices) {
    throw RequestError(404, 'Not found');
  }

  const total =
    title || category || location || name
      ? await Notice.find({
          title: { $regex: new RegExp(title, 'i') },
          category: { $regex: new RegExp(category, 'i') },
          location: { $regex: new RegExp(location, 'i') },
          name: { $regex: new RegExp(name, 'i') },
        }).count()
      : await Notice.find({}).count();

  res.json({
    code: 200,
    status: 'success',
    data: notices,
    totalPages: Math.ceil(total / limit),
    page,
  });
});

module.exports = getAll;
