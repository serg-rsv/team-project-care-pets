export const selectToken = state => state.auth.token;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectNotices = state => state.notices.items;
export const selectIsLoadMore = state => state.notices.isLoadMore;
export const selectShowModal = state => state.modal.showModal;
export const selectChangeMarker = state => state.modal.marker;
export const selectLanguage = state => state.language.currentLanguage;
