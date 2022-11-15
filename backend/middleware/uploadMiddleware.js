const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');

const api_secret = '0KR3iBGjTT0CBR_Gkkdy4NOmtmE';
// const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: 'dxxsrtjlb',
  api_key: '915276319874155',
  api_secret,
});

const uploadMiddleware = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const format = originalname.split('.')[1];
  const { _id } = req.user;

  const folder = req.baseUrl.split('/')[3];

  const public_id = `${folder.slice(0, -1)}_${
    folder === 'users' ? _id : _id + '_' + Date.now()
  }`;

  try {
    const resultOfUpload = await cloudinary.uploader.upload(tempUpload, {
      public_id,
      folder,
      format,
      min_width: 160,
      max_width: 700,
      transformation: { width: 350, crop: 'pad' },
    });

    const resultUrl = resultOfUpload.url;
    const resultId = resultOfUpload.public_id;

    folder === 'users'
      ? ((req.user.photoURL = resultUrl), (req.user.photoId = resultId))
      : ((req.body.photoURL = resultUrl), (req.body.photoId = resultId));

    console.log('REQ_USER', req);
    next();
  } catch (error) {
    throw error;
  } finally {
    await fs.unlink(req.file.path);
  }
};

module.exports = uploadMiddleware;
