const { cloudUpload, cloudDelete } = require('./cloudinaryService');
const { addPet, getOwnerPets, deletePet } = require('./petsService');
const { addNews, getNewsList } = require('./newsService');
const { addFriend, getFriendsList } = require('./friendsService');

module.exports = {
  cloudUpload, // upload image to CLOUD storage
  cloudDelete, // delete image from CLOUD storage

  addPet, // add PET to db
  getOwnerPets, // get owner PETs from db
  deletePet, // delete PET from db

  addNews, // add NEWS to db
  getNewsList, // get NEWS from db

  addFriend, // add FRIEND to db
  getFriendsList, // get FRIEND from db
};
