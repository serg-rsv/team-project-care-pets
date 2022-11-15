const cloudinary = require('cloudinary').v2;
const RequestError = require('../helpers');

const cleanImgMiddleware = async (req, _, next) => {
  const { photoId } = req.body;

  try {
    await cloudinary.uploader.destroy(photoId);
  } catch {
    throw RequestError(400, `photo with ID ${public_id} not found`);
  } finally {
    next();
  }
};

module.exports = cleanImgMiddleware;
