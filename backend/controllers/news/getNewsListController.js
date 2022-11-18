const { getNewsList } = require('../../services');

const getNewsListController = async (req, res) => {
  const news = await getNewsList(req.query);

  res.json({
    code: 200,
    status: 'success',
    data: news,
  });
};

module.exports = getNewsListController;
