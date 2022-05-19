/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const initialState = {
  currentChannelId: '',
};

const uiSlice = createSlice({
  name: 'currChannel',
  initialState,
  reducers: {
    setCurrChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        if (state.currentChannelId === action.payload) {
          state.currentChannelId = 1;
        }
      });
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
