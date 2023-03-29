export const SET_LANGUAGES = ['en', 'uk'];

export function getInitialLanguage() {
  const persistorData = localStorage.getItem('persist:language');
  const parsedPersistorData = JSON.parse(persistorData);
  const savedLanguage =
    parsedPersistorData?.currentLanguage &&
    JSON.parse(parsedPersistorData.currentLanguage);

  if (savedLanguage && SET_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }
  return 'en';
}
