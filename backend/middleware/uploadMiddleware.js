const fs = require('fs/promises');
const { cloudUpload } = require('../services');

const uploadMiddleware = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const format = originalname.split('.')[1];
  const { _id } = req.user;

  const folder = req.baseUrl.split('/')[3];

  const public_id = `${folder.slice(0, -1)}_${
    folder === 'users' ? _id : _id + '_' + Date.now()
  }`;

  try {
    const { resultUrl, resultId } = await cloudUpload(
      tempUpload,
      public_id,
      folder,
      format
    );

    folder === 'users'
      ? ((req.user.photoURL = resultUrl), (req.user.photoId = resultId))
      : ((req.body.photoURL = resultUrl), (req.body.photoId = resultId));

    next();
  } catch (error) {
    throw error;
  } finally {
    await fs.unlink(req.file.path);
  }
};

module.exports = uploadMiddleware;
