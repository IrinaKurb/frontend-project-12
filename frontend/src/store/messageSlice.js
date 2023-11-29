import { createSlice } from "@reduxjs/toolkit";
import { removeChannel } from "./channelSlice";
import { remove } from "lodash";

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
    extraReducers: (builder) => {
        builder
            .addCase(removeChannel, (state, { payload }) => {
                const { channelId } = payload;
                console.log(payload);
                remove(state.messages, (message) => message.channelId === channelId);
            })
            /*.addCase(addInitialChannel, (state, { payload }) => {
                console.log(payload);
                const { messages } = payload;
                state.messages = messages;
            });*/
            
    },
});

export const { addInitialMessages, addMessage } = messageSlice.actions; // достали action

export default messageSlice.reducer; // экспорт редьюсеров, которые и должны юыть подключены в стор
