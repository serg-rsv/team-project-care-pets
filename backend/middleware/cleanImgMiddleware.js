const RequestError = require('../helpers');
const { cloudDelete } = require('../services');

const cleanImgMiddleware = async (req, _, next) => {
  const { photoId } = req.body;

  try {
    await cloudDelete(photoId);
  } catch {
    throw RequestError(400, `photo with ID ${photoId} not found`);
  } finally {
    next();
  }
};

module.exports = cleanImgMiddleware;
