const Jimp = require('jimp');
const axios = require('axios');
const { IMGBB_API_KEY } = process.env;
const FormData = require('form-data');
const path = require('path');

const fs = require('fs/promises');

const BASE_URL = `https://api.imgbb.com/1/upload?key=8ea4f870d5d30574f00a82289cec4d0e`;

const uploadMiddleware = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;

  const image = await Jimp.read(tempUpload);

  // const fileBase64Next = await fs.readFile(tempUpload, 'base64');

  const file = await fs.readFile(tempUpload);
  const form = new FormData();

  await form.append('image', file);
  const headers = await form.getHeaders();
  // const

  // console.log('HEADERS', headers);

  // console.log('FORM', form);

  try {
    const uploadImageData = await axios.post(BASE_URL, form.getBuffer(), {
      headers,
    });
    console.log('uploadImageData', uploadImageData);

    //   await axios.post(BASE_URL, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   image: formData,
    // });
    // const avatarURL = uploadImageData.data.data.url;
    // await fs.unlink(tempUpload);
    req.avatarURL = avatarURL;
    next();
  } catch (error) {
    // await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = uploadMiddleware;
