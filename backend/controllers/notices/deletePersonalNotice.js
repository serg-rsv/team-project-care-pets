const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const deletePersonalNotice = asyncHandler(async (req, res) => {
  const { noticeId } = req.params;

  // Зачистити ІД в обраних серед юзерів
  const isRemoved = await Notice.findByIdAndDelete(noticeId);

  if (!isRemoved) {
    throw RequestError(404, 'Not found');
  }

  res.json({
    code: 200,
    status: 'success',
    message: 'Notice is removed',
  });
});

module.exports = deletePersonalNotice;
