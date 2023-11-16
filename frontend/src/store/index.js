import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelSlice';
import messagesReducer from './messageSlice';

export default configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
    }
});
