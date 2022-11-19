const { notices = [{ _id }, { id }] } = useByCategory;
const { user = { favorites: ['dfasdf', 'wrqerqwe'] } } = useCurrent;

const helper = (notices, favorites) => {
  const completedNotices = notices.map(not =>
    favorites.include(not._id)
      ? (not.isFavorite = true)
      : (not.isFavorite = false)
  );
  return completedNotices;
};

NoticeList;
