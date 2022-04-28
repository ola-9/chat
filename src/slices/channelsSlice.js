import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
