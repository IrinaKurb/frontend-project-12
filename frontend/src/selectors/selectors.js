import { createSelector } from "@reduxjs/toolkit";

const selectState = (state) => state;
const selectChannels = (state) => state.channelsStore.channels;
const selectCurrentChannelId = (state) => state.channelsStore.currentChannelId;
const selectMessages = (state) => state.messagesStore.messages;

export const getOpenedStatus = createSelector(
  [selectState],
  (state) => state.modalsWindows.isOpened
);

export const getModalType = createSelector(
  [selectState],
  (state) => state.modalsWindows.modalType
);

export const getCurrentChannels = createSelector(
  [selectState],
  (state) => state.channelsStore.channels
);

export const getCurrentChannelId = createSelector(
  [selectState],
  (state) => state.channelsStore.currentChannelId
);

export const getCurrentChannel = createSelector(
  [selectChannels, selectCurrentChannelId],
  (channels, currentChannelId) => {
    return channels.find((c) => c.id === currentChannelId);
  }
);

export const getMessagesForCurrentChannel = createSelector(
  [selectCurrentChannelId, selectMessages],
  (currentChannelId, messages) => {
    const channelMessages = messages.filter(
      (m) => m.channelId === currentChannelId
    );
    return channelMessages;
  }
);

export const getChannelsNames = createSelector([selectChannels], (channels) => {
  return channels.map(({ name }) => name);
});
