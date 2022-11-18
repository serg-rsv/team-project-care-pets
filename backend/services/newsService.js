const { News } = require('../models');

const addNews = async newsData => {
  const newNews = await News.create({ ...newsData });
  return newNews;
};

const getNewsList = async queries => {
  const { page = 1, limit = 10 } = queries;
  const skip = (page - 1) * limit;

  const news = await News.find({}, '-createAt -updateAt', { skip, limit });
  return news;
};

module.exports = {
  addNews,
  getNewsList,
};
