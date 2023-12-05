export const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsStore;
  return channels.find((c) => c.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsStore;
  const { messages } = state.messagesStore;
  const channelMessages = messages.filter((m) => m.channelId === currentChannelId);
  return channelMessages;
};

export const getChannelsNames = (state) => {
  const { channels } = state.channelsStore;
  return channels.map(({ name }) => name);
};

export const getChannelById = (channelId) => (state) => {
  const { channels } = state.channelsStore;
  return channels.find(({ id }) => channelId === id);
};
