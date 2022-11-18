const { cloudDelete } = require('../services');

const cleanImgMiddleware = async (req, _, next) => {
  const { photoId } = req.user;
  if (!photoId) return next();

  try {
    await cloudDelete(photoId);
  } catch (error) {
    console.log('cleanImgMiddleware ~ error', error);
  } finally {
    next();
  }
};

module.exports = cleanImgMiddleware;
