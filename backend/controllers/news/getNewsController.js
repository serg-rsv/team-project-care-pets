const asyncHandler = require('express-async-handler');
const { News } = require('../../models');

const getNews = asyncHandler(async (req, res) => {
  const news = await News.find({}, '-createAt -updateAt');
  res.json({
    code: 200,
    status: 'success',
    data: news,
  });
});

module.exports = getNews;
