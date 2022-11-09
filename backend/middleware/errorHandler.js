module.exports = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500;
  const customError = process.env.NODE_ENV === 'production' ? null : err.stack;
  res.status(statusCode);
  res.json({
    code: statusCode,
    status: 'fail',
    message: err.message,
    stack: customError,
  });
};
