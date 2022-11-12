const { RequestError } = require('../helpers');
const { category: list } = require('../models/Notice');

const isValidCategory = (req, res, next) => {
  const { category } = req.params;
  const isCorrect = list.includes(category);

  if (!isCorrect) {
    const error = RequestError(
      400,
      `${category} is wrong. Category must be one of ${list}`
    );
    next(error);
  }
  next();
};

module.exports = isValidCategory;
