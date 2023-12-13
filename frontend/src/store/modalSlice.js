/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  modalType: null,
  managedChannelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModalWindow: (state, action) => {
      const { modalType, managedChannelId } = action.payload;
      state.isOpened = true;
      state.modalType = modalType;
      state.managedChannelId = managedChannelId ?? null;
    },
    closeModalWindow: (state) => {
      state.isOpened = false;
      state.modalType = null;
    },
  },
});

export const { openModalWindow, closeModalWindow } = modalsSlice.actions; // достали action

export default modalsSlice.reducer; // экспорт редьюсеров, которые и должны быть подключены в стор
