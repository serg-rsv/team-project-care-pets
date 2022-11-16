const { Friend } = require('../models');

const addFriend = async friendData => {
  const newFriend = await Friend.create({ ...friendData });
  return newFriend;
};

const getFriendsList = async () => {
  const friends = await Friend.find({}, '-createAt -updateAt');
  return friends;
};

module.exports = {
  addFriend,
  getFriendsList,
};
