const { Friend } = require('../models');

const addFriend = async friendData => {
  const newFriend = await Friend.create({ ...friendData });
  return newFriend;
};

const getFriendsList = async queries => {
  const { page = 1, limit = 10 } = queries;
  const skip = (page - 1) * limit;

  const friends = await Friend.find({}, '-createAt -updateAt', { skip, limit });
  return friends;
};

module.exports = {
  addFriend,
  getFriendsList,
};
