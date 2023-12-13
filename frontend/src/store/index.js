/* eslint-disable no-param-reassign */
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
    return state;
  }
  return combineReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
