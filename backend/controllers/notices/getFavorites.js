const asyncHandler = require('express-async-handler');
const { User } = require('../../models');

const getFavorites = asyncHandler(async (req, res) => {
  const { user } = req;
  const populatedUser = await user.populate(
    'favorites',
    '-createdAt -updatedAt'
  );
  const { favorites } = populatedUser;
  // Якщо в БД у користувача в favorites є ID оголошення, а саме оголошеня видалено,
  // то в масив нічого не додається.
  res.json({
    code: 200,
    status: 'success',
    data: favorites,
  });
});

module.exports = getFavorites;
