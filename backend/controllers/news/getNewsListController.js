const { getNews } = require('../../services');

const getNewsListController = async (_, res) => {
  const news = await getNews();

  res.json({
    code: 200,
    status: 'success',
    data: news,
  });
};

module.exports = getNewsListController;
