import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
  ],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: () => {
      console.log('add channel');
    },
    renameChannel: () => {
      console.log('rename channel');
    },
    removeChannel: () => {
      console.log('remove channel');
    },
  },
});

export const { addChannel, renameChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
