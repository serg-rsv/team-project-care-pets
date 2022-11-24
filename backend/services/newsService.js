const { News } = require('../models');

const addNews = async newsData => {
  const newNews = await News.create({ ...newsData });
  return newNews;
};

const getNewsList = async queries => {
  const { title = '', page = 1, limit = 12 } = queries;
  const skip = (page - 1) * limit;

  const news = await News.find(
    { title: { $regex: new RegExp(title, 'i') } },
    '-createAt -updateAt',
    { skip, limit }
  );
  return news;
};

module.exports = {
  addNews,
  getNewsList,
};
