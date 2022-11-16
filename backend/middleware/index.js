const errorHandler = require('./errorHandler');
const auth = require('./auth');
const uploadMiddleware = require('./uploadMiddleware');
const upload = require('./multer');
const cleanImgMiddleware = require('./cleanImgMiddleware');
const cleanUserAvatarMiddleware = require('./cleanUserAvatarMiddleware');

module.exports = {
  errorHandler,
  auth,
  uploadMiddleware,
  upload,
  cleanImgMiddleware,
  cleanUserAvatarMiddleware,
};
