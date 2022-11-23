const { cloudDelete } = require('../services');

const cleanImgMiddleware = async (req, _, next) => {
  const { photoId } = req.body;
  if (!photoId) return next();

  try {
    await cloudDelete(photoId);
  } catch (err) {
  } finally {
    next();
  }
};

module.exports = cleanImgMiddleware;
