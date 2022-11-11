const asyncHandler = require('express-async-handler');

const { Notice } = require('../../models');
const { RequestError } = require('../../helpers');

const deletePersonalNotice = asyncHandler(async (req, res) => {
  const { noticeId } = req.params;

  const isRemoved = await Notice.findByIdAndDelete(noticeId);

  if (!isRemoved) {
    throw RequestError(404, 'Not found');
  }

  res.json({
    code: 200,
    status: 'success',
    // data,
  });
});

module.exports = deletePersonalNotice;
