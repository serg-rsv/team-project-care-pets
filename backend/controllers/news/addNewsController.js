const { addNews } = require('../../services');

const addNewsController = async (req, res) => {
  const newNews = await addNews(req.body);

  res.status(201).json({
    code: 201,
    status: 'success',
    data: newNews,
  });
};

module.exports = addNewsController;
