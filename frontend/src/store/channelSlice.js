import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channels: [],
}

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        addChannel(state, action) {
            console.log('add channel!');
            //console.log(state.channels);
            const newChannels = action.payload;
            const channels = newChannels.map((channel, id) => (
                id === 0 ? 
                {
                    ...channel,
                    isCurrent: true,
                } :
                {
                    ...channel,
                    isCurrent: false,
                }
            ))
            state.channels.push(...channels)
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

export const { addChannel } = channelSlice.actions; // достали action

export default channelSlice.reducer; // экспорт редьюсеров, которые и должны юыть подключены в стор

