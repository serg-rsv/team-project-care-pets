const convectorCategory = category => {
  if (category === 'sell') {
    return (category = 'продається');
  }
  if (category === 'lost-found') {
    return (category = 'знайшов/загубив');
  }
  if (category === 'for-free') {
    return (category = 'у добрі руки');
  }
};

export default convectorCategory;
