import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channels: [],
    currentChannelId: null,
}

const channelSlice = createSlice({
    name: 'channelInfo',
    initialState,
    reducers: {
        addInitialChannel(state, action) {
            //console.log('add channel from Store!');
            const channelsFromStore = action.payload;
            //console.log(channelsFromStore);
            state.channels.push(...channelsFromStore);
        },
        setCurrentChannelId(state, action) {
            console.log(action.payload);
            const currentChannelId = action.payload;
            state.currentChannelId = currentChannelId;
        },
        addChannel(state, action) {
            console.log(action.payload);
            const newChannelName = action.payload;
            state.channels.push(newChannelName);
        },
    },
});

export const { addInitialChannel, setCurrentChannelId, addChannel } = channelSlice.actions; // достали action

export default channelSlice.reducer; // экспорт редьюсеров, которые и должны быть подключены в стор
