const asyncHandler = require('express-async-handler');

const { News } = require('../../models');

const addNews = asyncHandler(async (req, res) => {
  const newNews = await News.create({ ...req.body });

  res.status(201).json({
    code: 201,
    status: 'success',
    data: newNews,
  });
});

module.exports = addNews;
