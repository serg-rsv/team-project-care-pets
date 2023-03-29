const convectorCategory = (category, lang) => {
  if (category === 'sell') {
    switch (lang) {
      case 'uk':
        return 'продається';
      case 'en':
        return 'for sale';
      default:
        break;
    }
  }
  if (category === 'lost-found') {
    switch (lang) {
      case 'uk':
        return 'знайшов/загубив';
      case 'en':
        return 'lost/found';
      default:
        break;
    }
  }
  if (category === 'for-free') {
    switch (lang) {
      case 'uk':
        return 'у добрі руки';
      case 'en':
        return 'good hands';
      default:
        break;
    }
  }
};

export default convectorCategory;
