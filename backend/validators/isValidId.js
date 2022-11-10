const { isValidObjectId } = require('mongoose');

const { RequestError } = require('../helpers');

const isValidId = idParam => {
  return (req, res, next) => {
    const isCorrectId = isValidObjectId(req.params[idParam]);

    if (!isCorrectId) {
      const error = RequestError(400, 'ID is not correct');
      next(error);
    }
    next();
  };
};

module.exports = isValidId;
