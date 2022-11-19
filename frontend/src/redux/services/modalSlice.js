import { createSlice } from '@reduxjs/toolkit';

const initialState = { showModal: false, marker: ' ' };

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action) {
      state.showModal = action.payload;
    },
    changeMarker(state, action) {
      state.marker = action.payload;
    },
  },
});

export const { showModal, changeMarker } = modalSlice.actions;
