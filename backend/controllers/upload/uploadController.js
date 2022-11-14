const uploadController = async (req, res) => {
  //   const { _id: userId } = req.user;
  const { path: tempUpload, originalname } = req.file;
  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).write(tempUpload);

    const extension = originalname.split('.').pop();
    const fileName = `User_${userId}_avatar.${extension}`;
    const uploadDir = path.join(avatarsDir, fileName);

    await fs.rename(tempUpload, uploadDir);
    const avatarURL = path.join('avatars', fileName);
    await User.findByIdAndUpdate(userId, { avatarURL });

    res.json({ avatarURL, status: 'success' });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = uploadController;
