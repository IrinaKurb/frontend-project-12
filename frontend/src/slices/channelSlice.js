/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelSlice = createSlice({
  name: 'channelInfo',
  initialState,
  reducers: {
    addInitialChannel(state, action) {
      const channelsFromStore = action.payload;
      state.channels.push(...channelsFromStore);
    },
    setCurrentChannelId(state, action) {
      const currentChannelId = action.payload;
      state.currentChannelId = currentChannelId;
    },
    addChannel(state, action) {
      const newChannelName = action.payload;
      state.channels.push(newChannelName);
    },
    removeChannel(state, action) {
      const defaultChannelId = 1;
      const { id } = action.payload;
      remove(state.channels, (item) => item.id === id);
      state.currentChannelId = defaultChannelId;
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const channel = state.channels.find(
        (channelItem) => channelItem.id === id,
      );
      channel.name = name;
    },
  },
});

export const {
  addInitialChannel,
  setCurrentChannelId,
  addChannel,
  removeChannel,
  renameChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
