import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            console.log('add message!');
            console.log(state.messages);
            const newMessage = action.payload;
            state.messages.push(...newMessage)
        },
        // 'набор методов (например, добавить удалить)'
        /* addMessage(state, action) {
            state.channels.push({
                id: ...,
                text: action.payload.text,
                ...
            })
        },
        */
    },
});

export const { addMessage } = messageSlice.actions; // достали action

export default messageSlice.reducer; // экспорт редьюсеров, которые и должны юыть подключены в стор

