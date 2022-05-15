import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import currChannelReducer from './currChannelSlice.js';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    currChannelReducer,
  },
});
