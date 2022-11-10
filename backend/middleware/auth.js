const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { RequestError } = require('../helpers');

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(RequestError(401, 'Not authorized'));
    return;
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findById(id);

    if (!user?.token) {
      next(RequestError(401, 'Not authorized'));
    }

    req.user = user;

    next();
  } catch (error) {
    if (
      error.message === 'invalid signature' ||
      error.message === 'invalid token'
    ) {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
