const errorHandler = require('./errorHandler');
const auth = require('./auth');
const handleSaveError = require('./handleSaveError');

module.exports = {
  handleSaveError,
  errorHandler,
  auth,
};
