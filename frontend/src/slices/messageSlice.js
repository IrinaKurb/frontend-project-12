import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import { removeChannel } from './channelSlice';

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messageInfo',
  initialState,
  reducers: {
    addInitialMessages: (state, action) => {
      const messages = action.payload;
      state.messages.push(...messages);
    },
    addMessage(state, action) {
      const newMessage = action.payload;
      state.messages.push(newMessage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const { channelId } = payload;
      remove(state.messages, (message) => message.channelId === channelId);
    });
  },
});

export const { addInitialMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
