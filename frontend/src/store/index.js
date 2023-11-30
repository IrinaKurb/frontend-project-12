import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelSlice';
import messagesReducer from './messageSlice';
import modalsReducer from './modalSlice';

const combineReducer = combineReducers({
    channelsStore: channelsReducer,
    messagesStore: messagesReducer,
    modalsWindows: modalsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'logout') {
        state = null;
    } else {
        return combineReducer(state, action);
    }
}

export default configureStore({
    reducer: rootReducer
});
