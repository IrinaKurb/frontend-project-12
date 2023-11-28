import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const messageSlice = createSlice({
    name: 'messageInfo',
    initialState,
    reducers: {
        addInitialMessages: (state, action) => {
            const messages = action.payload;
            //console.log('add message from Store!');
            //console.log(messages);
            state.messages.push(...messages);
        },
        addMessage(state, action) {
            console.log('add new message!');
            const newMessage = action.payload;
            state.messages.push(newMessage);
        },
    },
});

export const { addInitialMessages, addMessage } = messageSlice.actions; // достали action

export default messageSlice.reducer; // экспорт редьюсеров, которые и должны юыть подключены в стор
