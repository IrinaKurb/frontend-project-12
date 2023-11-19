import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channels: [],
    currentChannelId: 1,
}

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        addChannelsFromStore(state, action) {
            console.log('add channel from Store!');
            const channelsFromStore = action.payload;
            state.channels.push(...channelsFromStore);
        },
        setCurrentChannelId(state, action) {
            const currentChannelId = action.payload;
            state.currentChannelId = currentChannelId;
          }, 
    },
});

export const { addChannelsFromStore, setCurrentChannelId } = channelSlice.actions; // достали action

export default channelSlice.reducer; // экспорт редьюсеров, которые и должны быть подключены в стор
