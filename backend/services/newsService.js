const { News } = require('../models');

const addNews = async newsData => {
  const newNews = await News.create({ ...newsData });
  return newNews;
};

const getNewsList = async () => {
  const news = await News.find({}, '-createAt -updateAt');
  return news;
};

module.exports = {
  addNews,
  getNewsList,
};
