export const markFavoriteNotice = (notices = [], favorites = []) => {
  return notices?.map(notice =>
    favorites?.includes(notice._id)
      ? { ...notice, isFavorite: true }
      : { ...notice, isFavorite: false }
  );
};
