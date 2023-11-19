import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessagesFromStore: (state, action) => {
            console.log('add message from Store!');
            const messagesFromStore = action.payload;
            state.messages.push(...messagesFromStore);
        },
        addMessage(state, action) {
            console.log('add new message!');
            const newMessage = action.payload;
            state.messages.push(newMessage);
        },

    },
});

export const { addMessagesFromStore, addMessage } = messageSlice.actions; // достали action

export default messageSlice.reducer; // экспорт редьюсеров, которые и должны юыть подключены в стор
