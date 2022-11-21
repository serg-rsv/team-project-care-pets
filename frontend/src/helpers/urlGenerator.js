export const urlGenerator = object => {
  const array = Object.entries(object);
  return array.map(item => item.join('=')).join('&');
};
