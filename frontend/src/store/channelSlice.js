import { createSlice } from "@reduxjs/toolkit";
import { remove } from "lodash";

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
        removeChannel(state, action) {
            const defaultChannelId = 1;
            console.log(action.payload);
            const { id } = action.payload;
            //console.log("id channel: " + id);
            //state.channels = state.channels.filter((channel) => channel.id !== id);
            remove(state.channels, (item) => item.id === id); // обновили channels
            state.currentChannelId = defaultChannelId;

        },
        renameChannel(state, action) {
            console.log(action.payload);
            const { id, name } = action.payload;
            const channel = state.channels.find((channel) => channel.id === id);
            channel.name = name;
        }
    },
});

export const { addInitialChannel, setCurrentChannelId, addChannel, removeChannel, renameChannel } = channelSlice.actions; // достали action

export default channelSlice.reducer; // экспорт редьюсеров, которые и должны быть подключены в стор
