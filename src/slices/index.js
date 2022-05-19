import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import uiReducer from './uiSlice.js';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    uiReducer,
  },
});
