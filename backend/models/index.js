const { User, schemasJoiUser } = require('./User');
const { Notice, schemasJoiNotice } = require('./Notice');
const Pet = require('./Pet');
const News = require('./News');
const Friend = require('./Friend');

module.exports = {
  User,
  schemasJoiUser,
  Notice,
  schemasJoiNotice,
  Pet,
  News,
  Friend,
};
