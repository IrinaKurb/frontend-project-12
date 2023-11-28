import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelSlice';
import messagesReducer from './messageSlice';
import modalsReducer from './modalSlice';

export default configureStore({
    reducer: {
        channelsStore: channelsReducer,
        messagesStore: messagesReducer,
        modalsWindows: modalsReducer,
    }
});
