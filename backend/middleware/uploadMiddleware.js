const Jimp = require('jimp');
const axios = require('axios');
const { IMGBB_API_KEY } = process.env;
const path = require('path');

const fs = require('fs/promises');
// const uuid = require('uuid').v4;

const BASE_URL = 'https://api.imgbb.com/1/upload';

const uploadMiddleware = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).write(tempUpload);
    const uploadImageData = await axios.post(BASE_URL, {
      params: { key: IMGBB_API_KEY },
      data: { image: tempUpload },
    });
    const avatarURL = uploadImageData.data.data.url;
    await fs.unlink(tempUpload);
    req.avatarURL = avatarURL;
    next();
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = uploadMiddleware;
