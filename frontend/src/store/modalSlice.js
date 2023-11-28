import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpened: false,
    modalType: null,
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModalWindow(state) {
            /*
            const { modalType} = action.payload;
            console.log("modalType");
            console.log(modalType);
            */
            state.isOpened = true;
            //state.modalType = modalType;
        },
        closeModalWindow(state) {
            state.isOpened = false;
            //state.modalType = null;
        }
    },
});

export const { openModalWindow, closeModalWindow } = modalsSlice.actions; // достали action

export default modalsSlice.reducer; // экспорт редьюсеров, которые и должны быть подключены в стор
