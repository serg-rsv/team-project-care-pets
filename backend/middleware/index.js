const errorHandler = require('./errorHandler');
const auth = require('./auth');
const uploadMiddleware = require('./uploadMiddleware');
const upload = require('./multer');

module.exports = {
  errorHandler,
  auth,
  uploadMiddleware,
  upload,
};
