const { getNewsList } = require('../../services');

const getNewsListController = async (_, res) => {
  const news = await getNewsList();

  res.json({
    code: 200,
    status: 'success',
    data: news,
  });
};

module.exports = getNewsListController;
